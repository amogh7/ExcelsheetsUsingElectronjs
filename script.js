const $=require("jquery");
let db;
let lsc;

$("document").ready(function(){
    //when any cell is clicked address of that cell is calculated in the function which gives value to the address input 
    $(".cell").on("click",function(){
        //console.log(this) //gets current element
        let rowId=Number($(this).attr("rid"));
        let colId=Number($(this).attr("cid"));
        let cellAddress=String.fromCharCode(65+colId) + (rowId+1);
       console.log("rowId ",rowId);
       console.log("colId ",colId);

        console.log(cellAddress);
        $("#address").val(cellAddress);
        let cellObject=db[rowId][colId];
        
        $("#formula").val(cellObject.formula);






    });
    //setting the value of value in db after typing value
    $(".cell").on("blur",function(){
        lsc=this;
       let value= $(this).text();
       let rowId=Number($(this).attr("rid"));
       let colId=Number($(this).attr("cid"));
       let cellObject=db[rowId][colId];
       if(cellObject.value!=value){
           cellObject.value=value;
           console.log(cellObject);
           console.log(db)

       }


    });
    
    
function solveFormula(formula){
    //formula="(A1 + A2)"
    
    let fComponents=formula.split(" ");
    //fComponents=["(","A1", "+","A2",")"]
    console.log(fComponents);
    for(let i=0;i<fComponents.length;i++){
        let fComp=fComponents[i];
         //fcomp="A1"
         let cellName=fComp[0];
        //A1=> rowId ColId
        if(cellName>='A'&& cellName<='Z'){
            let {rowId,colId}=getRowIdAndColId(fComp);
            let cellObject=db[rowId][colId];
            //{
                //     name:"A1",
                //     value:"",
                //     formula:""
                // }
                let value=cellObject.value;
                formula=formula.replace(fComp,value);
                //"( 10 + A2 )"
            }
            //formula="( 10 + 20 )" after for loop ends
        }
        //stack.infix evaluation try yourself
        //eval function
    let value=eval(formula);
    return value;
}

$("#formula").on("blur",function(){ //updating formula and value after calculating when focus from fomula input changes
    let formula=$(this).val();
    let address=$("#address").val();
       
    let {rowId,colId} =getRowIdAndColId(address);
    //cell ko update krna hai
       //cell ka object nikalo db se
       //check if cellObject formula must not be equal the new formula 
       let cellObject=db[rowId][colId];
       
       if(cellObject.formula!=formula){
           let value=solveFormula(formula);
             //db updta
             cellObject.value=value+"";
             cellObject.formula=formula;
           //ui update
           $(lsc).text(value);
           console.log(cellObject);
        }
});

//utility function
function getRowIdAndColId(address){
    //adress="//A1" //"B2" // "Z100"
    let colId=address.charCodeAt(0)-65;
    let rowId=Number(address.substring(1))-1;
    return {
        rowId:rowId,
        colId:colId
    }

}




function init(){

db=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let cellAddressName=String.fromCharCode(65+j)+(i+1);
           let cellObject={
             name:cellAddressName,
             value:"" ,
             formula:" "

           }
           row.push(cellObject);
        }

        db.push(row);
        
    }
    

}
init();

});