function caos() {
    return {
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00',
        distance: 0,
        countdown: null,
        beerTime: new Date('Jan 31, 2024 00:00:00').getTime(),
        now: new Date().getTime(),
        start: function() {
            this.countdown = setInterval(() => {
                // Calculate time
                this.now = new Date().getTime();
                this.distance = this.beerTime - this.now;
                // Set Times
                this.days = this.padNum( Math.floor(this.distance / (1000*60*60*24)) );
                this.hours = this.padNum( Math.floor((this.distance % (1000*60*60*24)) / (1000*60*60)) );
                this.minutes = this.padNum( Math.floor((this.distance % (1000*60*60)) / (1000*60)) );
                this.seconds = this.padNum( Math.floor((this.distance % (1000*60)) / 1000) );
                // Stop
                if (this.distance < 0) {
                    clearInterval(this.countdown);
                    this.days = '00';
                    this.hours = '00';
                    this.minutes = '00';
                    this.seconds = '00';
                }
            },100);
        },
        padNum: function(num) {
            var zero = '';
            for (var i = 0; i < 2; i++) {
                zero += '0';
            }
            return (zero + num).slice(-2);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);;
    const vemcausar = urlParams.get('vemcausar');

    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById("email").value;

            const formData = {
                "form": {
                    "usuário": {
                        dataCadastro: Date.now(),
                        id: btoa(document.getElementById("email").value),
                        nome: document.getElementById("nome").value,
                        email: document.getElementById("email").value,
                        telefone: document.getElementById("telefone").value,
                        indicacao: vemcausar // Adiciona o email do indicador se existir
                    }
                }
            }

            fetch('https://caos.tgbprog.workers.dev/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then((data) => {
                // Gera a URL de indicação com o e-mail do usuário atual codificado
                document.getElementById('myForm').style.display = "none"
                document.getElementById("response").style.display="block"
                const refLink = `https://br.caos.wtf/?vemcausar=${btoa(email)}`;
                let responseText = `Dados enviados com sucesso! No dia do caos você vai querer estar acompanhado, indique um amigo e ganhe prêmios no dia do evento: ${refLink}`;
                document.getElementById("response").textContent = responseText;
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
        });
    }
});