import React, {
    Component
} from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {getStoredUser} from '../utils/storage';

var style = require('./informazioniStyle');

import Icon from 'react-native-vector-icons/FontAwesome/';

import DrawerButton from '../utils/drawerbutton';



export default class Informazioni extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{}
        };
 
    }

   static navigationOptions = {
  
      drawerLabel: 'Informazioni',
      drawerIcon: () => (
        
        <Icon name="info" size={20} color="#988C6C" />
        
      ),
      
    };

    async componentDidMount(){

          await getStoredUser((val, err) => {                                         
            if(err)
                return /*console.log(err)*/
            else if(val)
                this.setState({user: JSON.parse(val)}) 
        });
    }

    render() {

        return (
          <View style={style.mainView}>
<DrawerButton/>

<View style={{flex:1}}>

<View style={{flex:1, position:'absolute', left:'35%', maxHeight:300, maxWidth:250, marginTop:60, justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-end'}}>
 <ScrollView>

 <Text style={{textAlign:'center', fontSize:20, color:'#988C6C'}}> {text} </Text> 

 </ScrollView>
 </View>

 <View style={{flex:1}}>


      <Image
          source={require('../../immagini/dott_fabio_dangelo.png')}
          style={{width: '100%', height: '100%', right:'35%', top:'15%', resizeMode:'contain'}}

        />

</View>
</View>

<View style={{ flex: 1, position:'absolute', flexDirection: 'row', alignItems: 'center', bottom:'0.2%' }}>

        <TouchableOpacity
                        style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
                        backgroundColor:'#9A2C45',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
                        onPress={() => console.log('invia')}
                >
                    <Text style={{textAlign:'center', paddingHorizontal:10, color:'#988C6C'}}>Visita il sito</Text>
        </TouchableOpacity>
</View>
          </View>
        );
      }
}

const text = "Molisano di nascita e romano di adozione. Nel 2003 ottengo la laurea in Medicina e Chirurgia presso l’Università “La Sapienza” di Roma con il massimo dei voti e lode accademica, e sempre nella stessa università, nel 2008 mi specializzo in Ortopedia e Traumatologia, ancora una volta con il massimo dei voti e la lode accademica. Nel 2005 vinco il primo “Orthopaedic Fellowships” e poi, nel 2006 vinco il secondo “Orthopaedic Fellowships” presso la prestigiosa Università di Harvard (Boston, U.S.A.), dove per 1 anno ho la fortuna di assistere negli interventi i migliori chirurghi americani, e dove ho la possibilità di dedicarmi alla ricerca scientifica nel settore delle protesi articolari di anca e ginocchio. Da questa intensa esperienza formativa, una volta tornato in italia nel 2006, registro un brevetto in biomateriali ortopedici. http://www.freepatentsonline.com/WO2008006890.html Ormai specialista nel 2008 e spinto da un forte desiderio di conoscenza, lascio l’Italia per esercitare in Spagna, dove durante 4 anni rivesto il ruolo di primario responsabile del servizio di ortopedia e traumatologia per Quiron-Salud, il più grande gruppo di ospedali privati in Spagna. Nel 2014 porto a termine il Master in Gestione Sanitaria presso l’Università di Madrid. Nello stesso anno, spinto da un irrefrenabile desiderio di conoscenza, decido di lasciare la Spagna per trasferirmi nella “culla europea dell’ortopedia”: la Francia, reputata da tutti come la nazione più innovatrice d’Europa nella chirurgia ortopedica. Qui lavoro come consulente ortopedico per il gruppo Elsan, il più grande gruppo di ospedali privati in Francia. In Francia scopro una metodologia ed un’organizzazione del lavoro, assieme ad un “fervore” chirurgico ed una coesione tra i colleghi, che credo sia stato e continua ad essere ancora oggi, il vero punto di forza della chirurgia ortopedica francese. Gli scambi di opinioni con i colleghi, i congressi, le riunioni, fanno parte della quotidianità e da quest’esperienza ho cercato di prendere il meglio, unendo l’attività chirurgica quotidiana alla formazione teorica. Durante questi 4 anni continuo parallelamente i miei studi universitari di terzo livello in Spagna, per portare a termine il mio dottorato di ricerca. Nel 2017 ottengo il Dottorato (Ph.D) in Traumatologia dello Sport conseguito con il massimo dei voti e lode accademica presso l’Università Cattolica di Murcia (Spagna). Ma il 2018 vuole essere l’anno delle grandi scommesse, così decido di lasciare la Francia per tornare in Spagna dove accetto la sfida dar vita ad un progetto unico, quello di costituire il primo servizio in Europa completamente dedicato alla “Chirurgia Estetica del Piede” nella clinica più esclusiva d’Europa per la chirurgia plastica: la Clinica Planas di Barcellona. Dal 2017 sono consulente in l’Europa per Arthrex, una delle più grandi multinazionali americane leader nello sviluppo e produzione di sistemi per la chirurgia ortopedica. Nell’Arthro-Lab di Monaco di Baviera (Germania) mi dedico, in qualità di istruttore, alla formazione dei chirurghi ortopedici di tutta Europa, per la chirurgia mini-invasiva (percutanea) del piede. https://www.arthrex.com/resources/video/0cnHWI8E0kW-RQFh5kaetg/mis-hallux-valgus-and-tailor-bunion-repair Dal 2018 ricopro l’incarico di professore a contratto per la chirurgia della mano e del piede presso l’Università Autonoma di Barcellona (UAB), Spagna. https://www.uab.cat/web/postgrado/diplomatura-de-postgrado-en-actualitzacion-de-cirugia-plastica-fundacio-jaime-planas-/profesorado-1206597472129.html/param1-3826_es/param2-2008 … era il 2005, ed ero ancora specializzando in ortopedia quando realizzai il primo intervento di chirurgia percutanea del piede, senza sapere che stavo cominciando un viaggio che continua fino ad oggi. Ho conosciuto i maestri della chirurgia percutanea come Del Prado in Spagna ed Isham negli USA, ho seguito con interesse le evoluzioni che questa chirurgia ha subito nel tempo ed ho praticato ciò che avevo appreso … ma mancava sempre qualcosa … I numerosi riscontri positivi e la curiosità di scoprire le vere potenzialità di una tecnica tanto affascinante quanto difficile da eseguire, mi ha spinto ad osare. Molte delle tecniche chirurgiche che oggi utilizzo, sono il frutto di anni di studio, impegno e dedizione, ma anche di coraggio; il coraggio di entrare da pioniere in un mondo che a quel tempo era ancora sconosciuto. Con gli anni le mie tecniche chirurgiche si sono evolute e perfezionate. Oggi, dopo circa 1000 interventi chirurgici condotti sul piede, mi sorprendo ancora dei risultati estetici e funzionali apprezzabili sulle pazienti da me operate. "