// Milestone 1

// - Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e 
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// - Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e 
// immagine di ogni contatto

// Milestone 2

// - Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi 
//   relativi al contatto attivo all’interno del pannello della conversazione
// - Click sul contatto mostra la conversazione del contatto cliccato
const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                dropDown: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                dropDown: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                dropDown: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                dropDown: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
            ],
            // chiave che permette di gestire il contatto e la chat attiva
            activeUser: 0,
            // chiave che valorizza il messaggio inserito dall'utente nell'input
            newMessage: '',
            // chiave che regola la search bar dei contact
            searchList: ''
        };
    },
    methods: {
      // funzione che tramite l'index ricevuto attiva il contatto selezionato
      // indexContact ---> indice ricavato dal v-for che gestisce il contatto attivo 
      selectContac(indexContact) {
        this.activeUser = indexContact;
      },
      // funzione che legge l'input dell'utente e lo aggiunge all'elenco della chat
      writeMessage(){
        const userMessage= {
          date: '',
          message: this.newMessage,
          status: 'sent'
        };
        this.contacts[this.activeUser].messages.push(userMessage);
        this.newMessage = '';
      },
      // funzione che genera il messaggio di risposta
      answerMessage(){
        const answer= {
          date: '',
          message: 'ok',
          status: 'received'
        }
        this.contacts[this.activeUser].messages.push(answer);
      },
      // funzione che ritarda il messaggio di risposta 1 sec dopo che l'utente rilascia il tasto enter
      // message ---> messaggio pubblicato in chat a risposta di un keyUp dell'utente
      answerTimeout(message){
        setTimeout(message, 1000);
      },
      // funzione che regola lo stato di visibilità del dropdown menu
      // index ---> indice che seleziona il messaggio su cui è stato chiamto il dropdown
      showDropDown(indexMessage){
        if (this.contacts[indexMessage].dropDown){
          this.contacts[indexMessage].dropDown = false;
        }else{
          this.contacts[indexMessage].dropDown = true;
        }
      },
      // funzione che chiude il dropdown menu quando il mouse lascia l'area del messaggio
      // index ---> indice che seleziona il messaggio su cui è stato chiamto il dropdown
      mouseLeaveDropDown(indexMessage){
        if (!this.contacts[indexMessage].dropDown){
          this.contacts[indexMessage].dropDown = true;
        }
      },
      // funzione che elimina i messaggi dalla chat
      // index ---> indice del messaggio da cancellare
      deleteMessage(indexMessage){
        this.contacts[this.activeUser].messages.splice(indexMessage, 1);
      }
    },
    computed: {
      // funzione che filtra l'array contacts 
      // return: torna un nuovo array filtrato tramite la search bar
      searchContact(){
        return this.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(this.searchList.toLowerCase());
        });
      }
    }
}).mount('#app');
