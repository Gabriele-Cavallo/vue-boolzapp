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
const dt = luxon.DateTime;
const realTime = luxon.DateTime;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    dropDown: true,
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    dropDown: true,
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    dropDown: true,
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                  date: '20/03/2020 16:30:00',
                  message: 'Ciao come stai?',
                  status: 'sent',
                  dropDown: true,
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    dropDown: true,
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received',
                    dropDown: true,
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                  date: '28/03/2020 10:10:40',
                  message: 'La Marianna va in campagna',
                  status: 'received',
                  dropDown: true,
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    dropDown: true,
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    dropDown: true,
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                  date: '10/01/2020 15:30:55',
                  message: 'Lo sai che ha aperto una nuova pizzeria?',
                  status: 'sent',
                  dropDown: true,
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    dropDown: true,
                  }
                ],
              },
            ],
            // chiave che permette di gestire il contatto e la chat attiva
            activeUser: 0,
            // chiave che valorizza il messaggio inserito dall'utente nell'input
            newMessage: '',
            // chiave che regola la search bar dei contact
            searchList: '',
            currentDate: '',
            time: ''
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
          // data e ora attuale
          date: this.currentDate,
          message: this.newMessage,
          status: 'sent',
          dropDown: true
        };
        this.contacts[this.activeUser].messages.push(userMessage);
        this.newMessage = '';
      },
      // funzione che genera il messaggio di risposta
      answerMessage(){
        const answer= {
          // data e ora attuale
          date: this.currentDate,
          message: 'ok',
          status: 'received',
          dropDown: true,
        }
        this.contacts[this.activeUser].messages.push(answer);
      },
      // funzione che ritarda il messaggio di risposta 1 sec dopo che l'utente rilascia il tasto enter
      // message ---> messaggio pubblicato in chat a risposta di un keyUp dell'utente
      answerTimeout(message){
        setTimeout(message, 1000);
      },
      // funzione che regola lo stato di visibilità del dropdown menu
      // indexMessage ---> indice che seleziona il messaggio su cui è stato chiamto il dropdown
      showDropDown(indexMessage){
        if (this.contacts[this.activeUser].messages[indexMessage].dropDown){
          this.contacts[this.activeUser].messages[indexMessage].dropDown = false;
        }else{
          this.contacts[this.activeUser].messages[indexMessage].dropDown = true;
        }
      },
      // funzione che chiude il dropdown menu quando il mouse lascia l'area del messaggio
      // indexMessage ---> indice che seleziona il messaggio su cui è stato chiamto il dropdown
      mouseLeaveDropDown(indexMessage){
        if (!this.contacts[this.activeUser].messages[indexMessage].dropDown){
          this.contacts[this.activeUser].messages[indexMessage].dropDown = true;
        }
      },
      // funzione che elimina i messaggi dalla chat
      // indexMessage ---> indice del messaggio da cancellare
      deleteMessage(indexMessage){
        this.contacts[this.activeUser].messages.splice(indexMessage, 1);
      },
      // funzione per avere data e ora corrente
      getCurrentDate(){
        this.currentDate = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
      },
      // funzione per avere data e ora corrente nella chiave time
      realTimeDate(){
        this.time = realTime.now().setLocale('fr').toLocaleString(realTime.DATETIME_SHORT_WITH_SECONDS);
      }
    },
    mounted() {
      // funzione che al caricamento della pagina ricava data e ora attuali
      this.realTimeDate();
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
