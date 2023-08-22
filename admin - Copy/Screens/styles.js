import { StyleSheet, Text, View , Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#F7F7F7',
      
    },
    button:{
        backgroundColor: 'lightblue',
        height: 55,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginHorizontal:20,
        marginVertical:10,
        borderWidth:1,
        borderColor:'lightblue'

    },
    buttonText:{
        fontSize:30,
        fontWeight:'600',
        color:'blue',
        

    },
    bottomContainer:{
        justifyContent:'center',
        height: height/3,
    },
    textInput:{
        height:50,
        borderRadius: 50,
        marginHorizontal:20,
        marginVertical:10,
        borderWidth:1,
        paddingLeft:10,

    },
    formButton:{
        backgroundColor: 'lightblue',
        height: 55,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginHorizontal:20,
        marginVertical:10,
        borderWidth:1,
        borderColor:'lightblue',
        shadowColor: "#000000",
        shadowOffset: {
             width: 0,
         height: 3,
            },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5    
        
    },
    formContainer:{
        marginBottom:70,
    },
    closeContainer:{
        height:40,
        width:40,
        justifyContent:'center',
        alignSelf:'center',
        shadowColor: "#000000",
        shadowOffset: {
             width: 0,
         height: 3,
            },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:20,

    },
   
        inputView:{
          width:"80%",
          backgroundColor:"#FFFFFF",
          borderRadius:25,
          height:50,
          marginBottom:20,
          justifyContent:"center",
          padding:20
        },
        inputText:{
          height:50,
          color:"black"
        },
        forgot:{
          color:"white",
          fontSize:14
        },
        loginBtn:{
          width:"80%",
          backgroundColor:"#F07048",
          borderRadius:25,
          height:50,
          alignItems:"center",
          justifyContent:"center",
          marginTop:40,
          marginBottom:10,
          borderRadius: 18,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "center",
          fontSize:14,
          alignItems: "center",
        },
        
      });
    
  

  export default styles;