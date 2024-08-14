self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Lembrete: Não se esqueça de bater o ponto!',
        icon: '/images/icon.png',
        vibrate: [200, 100, 200],
        actions: [
            {action: 'explore', title: 'Abrir App', icon: '/images/checkmark.png'},
            {action: 'close', title: 'Fechar Notificação', icon: '/images/xmark.png'}
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Lembrete Diário', options)
    );
});
