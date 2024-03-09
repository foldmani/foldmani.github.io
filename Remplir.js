// JavaScript Document
function remplir(){ 
   
    /* Cette fonction sert à produire l'échiquier sous la forme d'un tableau de 8X8 
    dont l'identité des cases est égale à x y où x est la colonne et y la rangée.*/
    
    var intPositionX=0;
    var intPositionY=0;
    var i=0;     //variable qui gère le nombre d'itérations du 1er while
    var n=0;      //variable qui gère la condition n%2==0 pour faire alterner les couleurs des cases dans l'échiquier
    var strTd="";
    var strTr="";
    var strTrId=""
    var strCase1="background-color:burlyWood";      //variable qui définit la couleur de la case pâle
    var strCase2="background-color:#8b4727";        //variable qui définit la couleur de la case foncée
    var s=0;                                        //variable qui définit l'identité du tr dans l'échiquier
    var k=0;                                        //variable qui gère le nombre d'itérations dans le 2e while
    var strClasse="" ;
    var strTd2="";
    var strId="";
    var strTr2="";
    var strTrId2="out"; 
    
    strTr=document.createElement("TR");                      //créer un tr
    strTrId=0;                                               //définir l'id du tr
    strTr.id=strTrId;                                        //ajouter l'id du tr
    document.getElementById("table").appendChild(strTr);     //ajouter le tr à l'échiquier
       
    while(i<64){
             
        strTd=document.createElement("TD");                         //créer un td
        strTd.className="cases";                                    //ajouter une classe au td
        strTd.addEventListener("click",function(){bouger(this)});   //ajouter l'event au td
         
         if (intPositionX==8){                                      //changer de rangée
         
              intPositionX=0;
              
         }
         
         strTd.id+=" "+intPositionX+""+intPositionY;                 //définir l'id du td 
         
         if(n%2==0){
         
              strTd.style=strCase1;                                  //définir la couleur de la case
              
         }else{ 
                                                              
              strTd.style=strCase2;                                  //définir la couleur de la case
              
          }
              
         document.getElementById(s).appendChild(strTd);              //ajouter le td au tr dont le id correspond à s
          
         if(i==7 || i==15 || i==23 || i==31 || i==39 || i==47 || i==55){
              
            strTr=document.createElement("TR");                    //créer un tr
            s++;
            strTr.id=s;                                            //ajouter l'id au tr
            document.getElementById("table").appendChild(strTr);   //ajouter le tr à l'échiquier
            intPositionY++;
            n++;
            
          
         }
         
         
        i++;
        intPositionX++;
        n++;
            
    }
    
    /* Cette partie sert à produire l'espace hors-jeux des pièces sous la forme d'un tableau de 1X5 */
    
    strTr2=document.createElement("TR");                  //création de la rangée
    strTr.id=strTrId;
    document.getElementById("tableOut").appendChild(strTr2);       //ajout au div dans le HTML
        
    while(k<5){
    
         strTd2=document.createElement("TD");                         //création d'un td
         strTd2.addEventListener("click",function(){bouger(this)});   //ajout de l'event bouger(this) au td créé
         
         if(k%2!=0){
         
             strTd2.style= "background-color:burlyWood";           //ajout des couleurs de fond au td
             
         }else{
         
            strTd2.style= "background-color:#8b4727";
            
        }
        
        switch(true){                                       //définission de la classe et de l'id au td en fonction de la pièce qui sera ajoutée
        
             case k==0:
             strClasse="roiBlanc";
             strId="piece1";
             break;
             
             case k==1:
             strClasse="reine";
             strId="piece2";
             break;
             
             case k==2:
             strClasse="fou";
             strId="piece3";
             break;
             
             case k==3:
             strClasse="tour";
             strId="piece4";
             break;
             
             case k==4:
             strClasse="roiNoir";
             strId="piece5";
             break;
          
        }
        
        strTd2.id=strId;                               //ajout de l'id
        strTd2.className="cases "+strClasse;                          //ajout de la classe
        document.getElementById("tableOut").appendChild(strTd2);    //ajout du td au tr dans le div
        k++;
        
        }
      
    document.getElementById("instructions").innerHTML="Il faut mettre au moins les 2 rois et une autre pièce sur l'échiquier pour commencer le jeu.<br /><br /> Pour ce faire, il faut cliquer sur une pièce pour la sélectionner, puis cliquer sur la case de l'échiquer sur laquelle tu veux poser la pièce."  //Ajout des instructions initales 

}