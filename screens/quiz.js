import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Kysymysten oikeat vastaukset tulevat satunnaisesti eri paikoille
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Kysymysten hakeminen API:sta
const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [ques, setQues]= useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState (0);
  const [isLoading, setIsLoading] = useState(false);


  const getQuiz=async() =>{
    setIsLoading(true)
    const url ='https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
    const response= await fetch(url);
    //Vastauksen muuttaminen json-muotoon
    const data= await response.json();
    setQuestions(data.results);
    setOptions (generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false)
  };

  //Kun Quiz-sivu käynnistetään kutsutaan getQuiz-funktiota, joka lataa kysymykset
  useEffect(() =>{
    getQuiz()
  }, []);

const handleNextPress = () => {
  setQues(ques+1)
  setOptions (generateOptionsAndShuffle(questions[ques+1]))
}

{/*Vastausvaihtoehtojen esittäminen satunnaisessa järjestyksessä */}
const generateOptionsAndShuffle =(_question) =>{
  const options= [..._question.incorrect_answers]
  options.push(_question.correct_answer)
  console.log(options, "before")
  shuffleArray(options)
  console.log(options, "after")

  return options
}

{/*Funktio valitun vastausvaihtoehdon käsittelyyn ja oikean vastauksen pisteytykseen */}
const handleSelectedOption = (_option) => {
  if(_option===questions[ques].correct_answer){
    setScore(score+10)
  }
  if(ques!==9){ {/*Uusi kysymys */}
    setQues(ques+1)
    setOptions (generateOptionsAndShuffle(questions[ques+1]))
    console.log(_option===questions[ques].correct_answer)
  }
  if (ques===9){
    handleShowResult()
  }
  
}

{/*Funktio tuloksen käsittelyyn */}
const handleShowResult = () =>{
  navigation.navigate('Result', {
    score: score
  })
}


  return (
    <View style={styles.container}>
     {/*Kysymykset */}
     {isLoading ? 
     <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}> 
      <Text style={{fontSize: 32, fontWeight: 700 }}>LOADING....</Text>
     </View>

    : questions && (
    <View style={styles.parent}>
    <View style={styles.top}>
        <Text style={styles.question}> Q. {decodeURIComponent(questions[ques].question)}</Text>
      </View>

      {/*Vastausvaihtoehdot */}

      <View style= {styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress ={()=> handleSelectedOption(options[0])} >
            <Text style={styles.option}> {decodeURIComponent(options[0])} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress ={()=> handleSelectedOption(options[1])} >
            <Text style={styles.option}> {decodeURIComponent(options[1])} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress ={()=> handleSelectedOption(options[2])} >
            <Text style={styles.option}> {decodeURIComponent(options[2])} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress ={()=> handleSelectedOption(options[3])} >
            <Text style={styles.option}> {decodeURIComponent(options[3])} </Text>
        </TouchableOpacity>   
      </View>

      {/*Painikkeet ja niiden toiminnallisuus */}

      <View style={styles.bottom}>
       {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> PREVIOUS </Text>
        </TouchableOpacity> */}

        {ques!== 9 &&
        <TouchableOpacity style={styles.button} onPress={handleNextPress} >
          <Text style={styles.buttonText}> SKIP </Text>
        </TouchableOpacity> }

        {ques=== 9 &&
        <TouchableOpacity style={styles.button} onPress={handleShowResult} >
          <Text style={styles.buttonText}> SHOW RESULTS </Text>
        </TouchableOpacity> }

    
      </View> 
      </View> 
      )}
      
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options:{
    marginVertical: 16,
    flex: 1,
  },
  bottom:{
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button:{
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,

  },
  buttonText:{
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
  },
  question:{
    fontSize: 28,
  },
  option:{
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButton:{
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent:{
    height: "100%",
  },

});