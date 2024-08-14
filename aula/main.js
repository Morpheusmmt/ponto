// Verifica se o navegador suporta Service Workers e notificações
if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });

    document.getElementById('enable-notifications').addEventListener('click', function() {
        Notification.requestPermission(function(status) {
            console.log('Status da permissão de notificação:', status);
            if (status === 'granted') {
                agendarNotificacaoDiaria();
            }
        });
    });
}

function agendarNotificacaoDiaria() {
    // Calcula o tempo até as 13:40 de hoje ou amanhã
    let agora = new Date();
    let horarioNotificacao = new Date();
    horarioNotificacao.setHours(13, 40, 0, 0);

    if (agora > horarioNotificacao) {
        // Se já passou das 13:40 hoje, agenda para amanhã
        horarioNotificacao.setDate(horarioNotificacao.getDate() + 1);
    }

    let tempoAteNotificacao = horarioNotificacao.getTime() - agora.getTime();

    setTimeout(function() {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Lembrete Diário', {
                body: 'Não se esqueça de bater o ponto!',
                icon: '/images/icon.png',
                vibrate: [200, 100, 200],
            });
        });

        // Agendar a próxima notificação para o mesmo horário no dia seguinte
        setInterval(function() {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Lembrete Diário', {
                    body: 'Não se esqueça de bater o ponto!',
                    icon: '/images/icon.png',
                    vibrate: [200, 100, 200],
                });
            });
        }, 24 * 60 * 60 * 1000); // 24 horas em milissegundos

    }, tempoAteNotificacao);
}
