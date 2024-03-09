// JavaScript Document
/*Petit commentaire pour commencer: 

J'ai commencé le projet très tôt et je me suis avancé rapidement, ne n'ai alors pas pu m'inspirer de ce que d'autres avait fait pour
certains aspects de mon algorithme. J'ai traité le problème de la manière qui me semblait la plus simple c'est à dire une structure
de décision.Toutefois, la simplicité du fonctionnement a mené à une complexité du code qui est peut-être un peu excessive. J'étais 
aussi très absorbé par le challenge de faire intéragir diverse fonctions et je tentais de découvrir comment les variables pouvaient
passer d'une fonction à l'autre et comment je pouvais rendre une fonction presque entièrement dépendante du contexte dans lequel 
elle avait été déclenchée. Ce qui a probablement contribué à la complexité du code. Une partie de cette complexité provient d'une
tentative d'expolration plus qu'une production nette d'un projet, mais puisque tout fonctionne très bien et que j'avais fini très tôt
j'ai décidé de ne pas le modifier. J'ai ajouté un maximum de commentaires pour faciliter la lecture, mais le code reste très volumineux.*/

    //variables que j'ai créées pour isoler les valeurs en haut parce qu'elles sont une longue suite de string qui rendait la fonction ajusteMessage un peu (très) laide
    var strDeadpoolImg = '<center><img src="https://media.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.gif" style="width:20vw ;height:20vw"></center>';
    var strInstructionsApresErreur = "Pas vite vite hein? On va reprendre ça du début! <br /><br />Il faut mettre <b><ins>au moins les 2 rois et une autre pièce</ins></b> sur l'échiquier pour commencer le jeu.<br /><br /> Il faut cliquer sur une pièce pour la sélectionner, puis cliquer sur la case de l'échiquer sur laquelle tu veux poser la pièce.";            
    var strCommentaireApresErreur = "<div style='font-size:1.5em; text-align:center'>Il faut lire les instructions...</div><br />";
    var strInstructionsInitiales = "Il faut mettre au moins les 2 rois et une autre pièce sur l'échiquier pour commencer le jeu.<br /><br /> Pour ce faire, il faut cliquer sur une pièce pour la sélectionner, puis cliquer sur la case de l'échiquer sur laquelle tu veux poser la pièce.";
    var strCommentaireAutoEchec = "<div style='font-size:1.5em; text-align:center'>Tu ne peux pas aller là!<br /> Tu te metterais en auto-échec...</div><br />";
    var strImgAutoEchec = "<center><img src='https://media.giphy.com/media/WyrdDeIxGOlQA/giphy.gif' style='width:20vw ;height:20vw'></center>";
    var strInstructionsEnJeu = "Tu peux placer les pièces où tu le désires. Elles ne sont pas restreintes à un mouvement particulier, mais l'auto-échec est interdit. Tu peux aussi ajouter les pièces qui ne sont pas encore en jeu si tu veux.";
    var strImgEchec = "<center><div>Le roi blanc:</div><div><img src='https://bit.ly/33vmcXF' style='width:20vw ;height:13vw'></div></center>";
    var strImgMat = "<center><div>Le roi blanc:</div><div><img src='https://bit.ly/2L3Q1rU' style='width:20vw ;height:13vw'></div></center>"; 
    
    //variables nécessaires  
    var arReine = ["pas en jeu","pas en jeu",,]             //Position des pièces :[col,row,diag1,diag2]
    var arTour = ["pas en jeu","pas en jeu"]
    var arRoiNoir = ["pas en jeu","pas en jeu"];
    var arRoiBlancPositionFixe = ["pas en jeu","pas en jeu",,];    
    var arRoiBlanc = arRoiBlancPositionFixe;
    var arFou = ["pas en jeu","pas en jeu",,];               
    var blnEchecEtMat = false;
    var blnEnJeu = [false,false,false,false,false,false];       //[reine,tour,roiNoir,roiBlanc,fou,reine ou roiNoir ou tour ou fou]
    var blnPretAJouer = false;
    var strMessage = "";
    var strMsgHeader;
    var blnBouge = true;
    var strBouge = "";
    var strIdAncien = "";
    var arPieceEchec = ["N","N","N","N"];   //quelle pièce met le roi en échec sur[col,row,diag1,diag2] : N = none, R = reine, A = autre (soit le fou ou la tour)
    var strContexte                         //variable intermédiaire pour ajuster les messages en fonction du contexte
    
    function bouger(element){
    
    /*cette fonction sert à déplacer les pièces et à ajuster les messages/instructions en fonction
      des conditions de pret à jouer et d'auto-échec. Elle sert aussi de point d'ancrage à toutes les autres
      fonctions qui seront utilisées selon une structure de décision étalée sur plusieurs fonctions*/
      
        var strRoiBouge;              //Le nom du roi qui est bougé
        var strPosRoiBouge;           //La position où l'on tente de placer le roi qui est bougé
        var blnAutoEchec = false;
        var blnPlaceLaPiece;          //variable de condition de placer la pièce
        
        if(element.className == "cases"&& blnBouge == true){ 
              
        }else{
              
              if(blnBouge == true){
              
                  if(parseInt(element.id) == element.id && blnPretAJouer == false && blnEnJeu[3] == true && element.className != "cases roiBlanc"){       //ajuste le contexte
 
                       strContexte = "conditionNonRespectee"
  
                  }else{
                  
                      if(blnPretAJouer == false){                //ajuste le contexte
                         
                        strContexte = "initial+position";
         
                      }
                      
                      blnBouge = false;
                      strIdAncien = element.id;           //retire la pièce de la case
                      strBouge = element.className;
                      element.className = "rouge";
                     
                  }
                  
                  ajusteMessage(strContexte); 
                  
              }else{
              
                    if(blnPretAJouer == false && parseInt(element.id) == element.id && parseInt(strIdAncien) == strIdAncien && element.className != "rouge"){    //déterminer si on peut mettre la piece selon certaines conditions
                        
                        blnPlaceLaPiece = false;
                        strContexte = "conditionNonRespectee";
                       
                        
                    }else{
                     
                        blnPlaceLaPiece = true;
                        strContexte = "initial+position";
                       
                     
                     }  
                     
                     if(blnPlaceLaPiece == true){
                     
                         if(element.className == "cases" || element.className == "rouge" ){   //condition permettant seulement de placer la pièce dans une case vide
                              
                              if(strBouge == "cases roiBlanc" && blnEnJeu[2] == true || strBouge == "cases roiNoir" && blnEnJeu[3] == true){
                              
                                  strPosRoiBouge = element.id;   //définit la position où le roi est bougé si c'est un roi qui est bougé
                                  
                                  if(strBouge == "cases roiBlanc"){  // définit quel roi est bougé
                                  
                                      strRoiBouge = "B";
                                      
                                  }else{
                                  
                                      strRoiBouge = "N";
                                      
                                  }
                                  
                                  blnAutoEchec = verifAutoEchec(strRoiBouge,strPosRoiBouge); //vérifie le conflit d'auto-échec lorsque l'on place les deux rois côte à côte
                                  
                              } 
                               
                              if(blnAutoEchec == false){     
                               
                                       blnBouge = true;
                                       
                                       if(element.className != "rouge"){                  //place la pièce
                                       
                                            document.getElementById(strIdAncien).className = "cases";
                                            
                                       }else{                                             //place la pièce redéposer la pièce
                                       
                                            document.getElementById(strIdAncien).className = strBouge;
                                            
                                       }  
                                                                              
                                       element.className = strBouge;
                                       positionDesPieces(element.classList.item(1),element.id);  //mise à jour de la position des pièces après chaque déplacement
                                       verifConditions();
                                       
                                       if(blnPretAJouer == false){             //si les conditions de pret à jouer ne sont pas rencontrés
                                        
                                             strContexte = "initial+position";
                                             
                                       }else{
                                             
                                          strContexte = "enJeu";
                                          verifEchec();    
                                                                                    
                                       }
                                       
                                       strMsgHeader = "";
                                   
                              }else{ 
                               
                                   strContexte = "autoEchec";
                                    
                              } 
                              
                              
                         }else{
                         
                            verifConditions();
                            
                         }
                         
                    }
                    
                  ajusteMessage(strContexte); 
                    
              } 
                             
        } 
           
    }
    
    
    function verifConditions(){
    
    /* Cette fonction sert à vérifier si les conditions de prêt à jouer sont respectées*/
    
        if(blnEnJeu[3] != true || blnEnJeu[5] != true || blnEnJeu[2] != true){
        
            blnPretAJouer = false;
            
        }else{
        
            blnPretAJouer = true;
        
        }
    
    }
    
    function ajusteMessage(strContext){
    
    /*Cette fonction sert à ajuster les éléments de l'interface en fonction du contexte définit dans la fonction bouger*/
     
        if(strContext == "mat"){                       //Pour éviter la répétition 
        
        document.getElementById("body").style.backgroundColor = "red"; 
        
        }else{
        
        document.getElementById("body").style.backgroundColor = "lightblue";
        
        }
        if(strContext != "autoEchec"){                 //Pour éviter la répétition 
        
        document.getElementById("msgHeader").innerHTML = "";
        
        }
        
        if(strContext == "conditionNonRespectee"){
        
          document.getElementById("strMessage").innerHTML = strDeadpoolImg;
          document.getElementById("instructions").innerHTML = strInstructionsApresErreur;
          document.getElementById("msgHeader").innerHTML = strCommentaireApresErreur;
          document.getElementById("header").innerHTML = "Aimes-tu les Échecs?";
          document.getElementById("header").className = "normalHeader";
 
          
        }else if(strContext == "mat"){
        
          document.getElementById("header").className = "echecEtMat";
          document.getElementById("header").innerHTML = "Échec et Mat!";
          document.getElementById("strMessage").innerHTML = strImgMat;
        
        }else if(strContext == "autoEchec"){
         
           strMsgHeader = strCommentaireAutoEchec; 
           document.getElementById("strMessage").innerHTML = strImgAutoEchec;
           document.getElementById("msgHeader").innerHTML = strMsgHeader; 
         
        }else if(strContext == "initial+position"){
        
          MessagePosition()
          document.getElementById("header").innerHTML = "Aimes-tu les Échecs?";
          document.getElementById("header").className = "normalHeader";
          document.getElementById("instructions").innerHTML = strInstructionsInitiales;
          document.getElementById("strMessage").innerHTML = strMessage;
        
        }else if(strContext == "enJeu"){
        
          MessagePosition()
          document.getElementById("instructions").innerHTML = strInstructionsEnJeu;        
          document.getElementById("strMessage").innerHTML = strMessage;
        
        }else if(strContext == "echec"){
        
          document.getElementById("header").innerHTML = "Échec!";
          document.getElementById("header").className = "echec";
          document.getElementById("strMessage").innerHTML = strImgEchec;
        
        }
     
     }
    
    function MessagePosition(){
    
    /*cette fonction sert à ajuster le message indiquant la position des pièces dans le div*/
    
        strMessage = " <div id = 'msg'>  <div style = 'font-size:1.5em'> La position des pièces:  </div> ";
        
        if(blnEnJeu[0] == true){
           strMessage += " <div>La Reine: Colonne "+arReine[0]+", Rangée "+arReine[1]+"</div>"
        }else{
           strMessage += "<div>La Reine n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[1] == true){
           strMessage += "<div>La Tour: Colonne "+arTour[0]+", Rangée "+arTour[1]+"</div>"
        }else{
           strMessage += "<div>La Tour n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[4] == true){
           strMessage += "<div>Le fou: Colonne "+arFou[0]+", Rangée "+arFou[1]+"</div>"
        }else{
           strMessage += "<div>Le fou n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[2] == true){
           strMessage += "<div>Le Roi Noir: Colonne "+arRoiNoir[0]+", Rangée "+arRoiNoir[1]+"</div>"
        }else{
           strMessage += "<div>Le Roi Noir n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[3] == true){
           strMessage += "<div>Le Roi Blanc: Colonne "+arRoiBlanc[0]+", Rangée "+arRoiBlanc[1]+"</div>";
        }else{
           strMessage += "<div>Le Roi Blanc n'est pas en jeu</div>";
        }
        
        return strMessage
        
    }
    
    function verifAutoEchec(strRoiBouge,intPosition){
    
    /*cette fonction sert à vérifier si la position à laquelle le joueur
    tente de placer l'un des deux roi est une position adjacente à l'autre roi ce qui
    causerait un état d'auto-échec interdit*/
    
        var intPositionX = parseInt(intPosition.substr(1,1));
        var intPositionY = parseInt(intPosition.substr(2,1));
        var blnAutoEchec = false;
        var arRoiStable;    //le roi qui n'est pas en train de se faire déplacer
        
        if(strRoiBouge == "N"){
        
            arRoiStable = arRoiBlanc;
            
        }else if(strRoiBouge == "B"){
        
            arRoiStable = arRoiNoir;
            
        } 
        switch(true){                      //étale les situations dans laquelle il y a auto-échec
              
            case intPositionX == arRoiStable[0] && intPositionY == (arRoiStable[1]+1):
            blnAutoEchec = true;
            break;
            
            case intPositionX == arRoiStable[0] && intPositionY == (arRoiStable[1]-1):
            blnAutoEchec = true;
            break;
            
            case intPositionY == arRoiStable[1] && intPositionX == (arRoiStable[0]+1):
            blnAutoEchec = true;
            break;
            
            case intPositionY == arRoiStable[1] && intPositionX == (arRoiStable[0]-1):
            blnAutoEchec = true;
            break;
            
            case intPositionX == (arRoiStable[0]+1) && intPositionY == (arRoiStable[1]+1):
            blnAutoEchec = true;
            break;
            
            case intPositionX == (arRoiStable[0]-1) && intPositionY == (arRoiStable[1]+1):
            blnAutoEchec = true;
            break;
            
            case intPositionX == (arRoiStable[0]+1) && intPositionY == (arRoiStable[1]-1):
            blnAutoEchec = true;
            break;
            
            case intPositionX == (arRoiStable[0]-1) && intPositionY == (arRoiStable[1]-1):
            blnAutoEchec = true;
            break;
            
        }
              
        return blnAutoEchec;
       
     }
     
     
    function positionDesPieces(strPiece,strPosition){
    
    /*Cette fonction sert à mettre à jour les positions des pièces après chaque déplacement*/
    
        if(strPosition == "piece1" || strPosition == "piece2" || strPosition == "piece3" || strPosition == "piece4" || strPosition == "piece5" ){      //pour les cases hors jeux
        
              switch(strPiece){
              
                  case "reine":
                    arReine = ["pas en jeu","pas en jeu"];
                    blnEnJeu[0] = false;
                  break;
                  
                  case "tour":  
                    arTour = ["pas en jeu","pas en jeu"];
                    blnEnJeu[1] = false;
                  break;
                  
                  case "roiNoir":  
                    arRoiNoir = ["pas en jeu","pas en jeu"];
                    blnEnJeu[2] = false;
                  break;
                  
                  case "roiBlanc":  
                    arRoiBlancPositionFixe = ["pas en jeu","pas en jeu"];
                    blnEnJeu[3] = false;
                  break;
                  
                  case "fou":  
                    arFou = ["pas en jeu","pas en jeu"];
                    blnEnJeu[4] = false;
                  break;
                    
              }
        
        }else{                                                //pour les cases en jeu
        
            switch(strPiece){                                      //étale les situations selon la pièce bougée
            
                case "reine":
                
                  arReine[0] = parseInt(strPosition.substr(1,1));                     //col
                  arReine[1] = parseInt(strPosition.substr(2,1));                     //row
                  arReine[2] = parseInt(arReine[0])+parseInt(arReine[1]);             //diag1
                  arReine[3] = 7-parseInt(arReine[0])+parseInt(arReine[1]);           //diag2
                  blnEnJeu[0] = true;
                  
                break;
                
                case "tour": 
                 
                  arTour[0] = parseInt(strPosition.substr(1,1));
                  arTour[1] = parseInt(strPosition.substr(2,1));
                  blnEnJeu[1] = true;
                  
                break;
                
                case "roiNoir": 
                 
                  arRoiNoir[0] = parseInt(strPosition.substr(1,1));
                  arRoiNoir[1] = parseInt(strPosition.substr(2,1));
                  blnEnJeu[2] = true;
                  
                break;
                
                case "roiBlanc": 
                 
                  arRoiBlancPositionFixe[0] = parseInt(strPosition.substr(1,1));
                  arRoiBlancPositionFixe[1] = parseInt(strPosition.substr(2,1));
                  arRoiBlanc = arRoiBlancPositionFixe;
                  blnEnJeu[3] = true;
                  
                break;
                
                case "fou":
                  
                  arFou[0] = parseInt(strPosition.substr(1,1));
                  arFou[1] = parseInt(strPosition.substr(2,1));
                  arFou[2] = parseInt(arFou[0])+parseInt(arFou[1]);
                  arFou[3] = 7-parseInt(arFou[0])+parseInt(arFou[1]);
                  blnEnJeu[4] = true;
                  
                break;
                    
            }
        }
        
        if(blnEnJeu[0] == false && blnEnJeu[1] == false && blnEnJeu[4] == false ){    //les 4 autres que le roi blanc hors jeu en même temps
        
           blnEnJeu[5] = false; 
                            
        }else{
        
           blnEnJeu[5] = true;
           
        }
         
        arRoiBlanc = arRoiBlancPositionFixe;          //Redéfinition du arRoiBlanc si le roi blanc est sorti du jeu
         
     }
     
     function verifMat(){
     
     /*cette fonction sert à vérifier si le roi blanc est en échec et mat*/
     
        var blnMat = true;
        var intPositionX = arRoiBlancPositionFixe[0];    //position en X variate
        var intPositionY = arRoiBlancPositionFixe[1];    //position en Y variante        
        
        if(parseInt(arRoiBlancPositionFixe[1]) < 7 && blnMat == true){    //conditions afin de rester en jeu. Si le roi est à l'une des extrémité il ne vérifiera pas certaines cases qui seraient hors-jeu    
            
            intPositionX = arRoiBlancPositionFixe[0];                   //définition d'une case à étudier
            intPositionY = (arRoiBlancPositionFixe[1]+1);     
            arRoiBlanc = [intPositionX,intPositionY];                   //redéfinition de arRoiBlanc pour que les fonctions de sous routines n'aient pas à s'adapter
            blnMat = verifEchecAutours();                               //vérifier l'échec sur la position étudiée
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[1]) > 0 && blnMat == true){    //tant que blnMat est true, continuera de vérifier les cases adjacentes en jeu
           
            intPositionX = arRoiBlancPositionFixe[0];
            intPositionY = (arRoiBlancPositionFixe[1]-1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[0]) < 7 && blnMat == true){
        
            intPositionY = arRoiBlancPositionFixe[1];
            intPositionX = (arRoiBlancPositionFixe[0]+1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[0]) > 0 && blnMat == true){
        
            intPositionY = arRoiBlancPositionFixe[1];
            intPositionX = (arRoiBlancPositionFixe[0]-1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[0]) < 7 && parseInt(arRoiBlancPositionFixe[1]) < 7 && blnMat == true){
        
            intPositionX = (arRoiBlancPositionFixe[0]+1);
            intPositionY = (arRoiBlancPositionFixe[1]+1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[0]) > 0 && parseInt(arRoiBlancPositionFixe[1]) < 7 && blnMat == true){
        
            intPositionX = (arRoiBlancPositionFixe[0]-1);
            intPositionY = (arRoiBlancPositionFixe[1]+1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[0]) < 7 && parseInt(arRoiBlancPositionFixe[1]) < 0 && blnMat == true ){
        
            intPositionX = (arRoiBlancPositionFixe[0]+1);
            intPositionY = (arRoiBlancPositionFixe[1]-1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
        
        }   
        
        if(parseInt(arRoiBlancPositionFixe[0]) > 0 && parseInt(arRoiBlancPositionFixe[1]) > 0 && blnMat == true){
        
            intPositionX = (arRoiBlancPositionFixe[0]-1);
            intPositionY = (arRoiBlancPositionFixe[1]-1);
            arRoiBlanc = [intPositionX,intPositionY];
            blnMat = verifEchecAutours();
            
        
        }
        
        arRoiBlanc = arRoiBlancPositionFixe;  //réfinition de arRoiBlanc afin d'annuler l'impact de cette fonction sur sa valeur pour la suite
        
        return blnMat;
    
    }
    
    function verifEchecAutours(){
         
    /*Cette fonction vérifie si la case adjacente est mise en échec sur l'un des 4 axes*/
      
        var blnMat = true;
        
        if(blnMat == true){
        
            blnMat = verifCol();   //vérifie la colonne sur la case adjacente correspondant à arRoiBlanc au moment où elle a été appelée
        
        }
        
        if(blnMat == false){
        
            blnMat = verifRow();
            
        }
        
        if(blnMat == false){
            
            blnMat = verifDiag();
        
        }
        
        if(blnMat == false){
        
            blnMat = verifRoiNoirMat();
        
        } 
        
        return blnMat;

    }
    
    function verifRoiNoirMat(){
    
    /*cette fonction sert uniquement à prendre en compte le roi noir dans l'échec et mat car il ne peut
      pas mettre le roi blanc directement en échec mais il peut mettre la case adjacente en échec. Elle
      organise la manière dont la fonction verifRoiNoir se comportera en fonction de la position relative
      du roi noir en fonction de la case adjacente au roi blanc qui est étudiée*/
         
        var blnEchec;
        var i;
        
        switch(true){
        
            case arRoiNoir[0] == (arRoiBlanc[0]+1):
                i = 1;
                blnEchec = verifRoiNoir(i);    //fait appel à la fonction suivante  pour optimiser le code (répétition de la même action)
                return blnEchec;
            break;
            
            case arRoiNoir[1] == (arRoiBlanc[1]+1):
                i = 0;
                blnEchec = verifRoiNoir(i);
                return blnEchec;
            break;
            
            case arRoiNoir[0] == (arRoiBlanc[0]-1):
                i = 1;
                blnEchec = verifRoiNoir(i);
                return blnEchec;
            break;
            
            case arRoiNoir[1] == (arRoiBlanc[1]-1):
                i = 0;
                blnEchec = verifRoiNoir(i);
                return blnEchec;
            break;
            
            default:
                return false;        
            
        }
    
    }
    function verifRoiNoir(i){
    
    /*cette fonction sert à vérifier si l'une des 3 cases adjacente du côtés du roi noir étudié est
      au même endroit que la position adjacente du roi blanc qui est étudiée*/
    
        switch(arRoiNoir[i]){
        
            case arRoiBlanc[i]-1:
                return true;
            break;
            
            case arRoiBlanc[i]+1:
                return true;
            break;
            
            case arRoiBlanc[i]:
                return true;
            break;
            
            default:
                return false;
           
        }
          
    }
    
    
    function verifEchec(){
    
    /*cette fonction vérifie si le roi blanc est en échec et organise la façon dont l'interface
    se comporte selon les différents cas possibles*/
    
        var blnMat;
        var blnRow;
        var blnCol;
        var blnDiag;
          
        arRoiBlanc = arRoiBlancPositionFixe;
        blnCol = verifCol();
        blnRow = verifRow();
        blnDiag = verifDiag();
        
        if(blnCol == true || blnRow == true || blnDiag == true){     //vérifie le mat uniquement si le roi blanc est en échec
           
           blnMat = verifMat();
           
           if(blnMat == false){
           
              strContexte="echec"
           
           }else{
           
              strContexte="mat"
           
           }
         
        }

    }
    
    function verifRow(){
    
    /*cette fonction organise la vérification de l'échec du roi blanc sur l'axe des Y*/
    
        var blnRow = false;
        var strSens = "Row";
        var k = 1;         //puisque pièce[1] = position en Y
          
        if(blnEnJeu[0] == true || blnEnJeu[1] == true){     //si la reine ou la tour est en jeu
          
          if(arReine[1] == arRoiBlanc[1] || arTour[1] == arRoiBlanc[1]){    //si la reine ou la tour est sur la même rangée que le roi blanc
             
            blnRow = true; 
            plusPres(arReine[0],arTour[0],arRoiBlanc[0],k);        //vérifier lequel met le roi blanc en échec
          
          } 
          
        }
        
        if(blnEnJeu[2] == true && blnRow == true || blnEnJeu[4] == true && blnRow == true){         //si le fou ou le roi noir est en jeu
             
          blnRow = obstacles(strSens,arPieceEchec[1]);                                    //vérifier les obstacles
          
        }
        
        return blnRow;
       
    }
    
    function verifCol(){
    
    /*cette fonction organise la vérification de l'échec du roi blanc sur l'axe des X*/
    
        var blnCol = false;
        var strSens = "Col";
        var k = 0;         //puisque pièce[0] = position en X
        
        if(blnEnJeu[0] == true || blnEnJeu[1] == true){      //si la reine ou la tour est en jeu
        
           if(arReine[0] == arRoiBlanc[0] || arTour[0] == arRoiBlanc[0]){  //si la reine ou la tour est sur la même colonne que le roi blanc
            
             blnCol = true; 
             plusPres(arReine[1],arTour[1],arRoiBlanc[1],k);      //vérifier lequel met le roi blanc en échec
             
          }
           
        }
        
        if(blnEnJeu[2] == true && blnCol == true || blnEnJeu[4] == true && blnCol == true){      //si le fou ou le roi noir est en jeu
        
            blnCol = obstacles(strSens,arPieceEchec[0]);                                   //vérifier les obstacles
            
        }
                               
        return blnCol 
      
    }
    
    function verifDiag(){
    
    /*cette fonction sert à vérifier si le roi blanc est mis en échec sur l'une des 2 diagonales*/
    
        var strSens;
        var blnDiag1;
        var blnDiag2;
          
        arRoiBlanc[2] = parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1]);   //arRoiBlanc[x,y,diag1,diag2]
        arRoiBlanc[3] = 7-parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1]);
          
        switch(arRoiBlanc[2]){     //étudie diag1
        
            case arReine[2]:
                k = 2;
                blnDiag1 = plusPres(arReine[2],arFou[2],arRoiBlanc[2],k);      //vérifie lequel est le plus près
            break;
            
            case arFou[2]:
                k = 2;
                blnDiag1 = plusPres(arReine[2],arFou[2],arRoiBlanc[2],k);      //vérifie lequel est le plus près
            break;
            
            default:
                blnDiag1 = false;
                arPieceEchec[2] = "N";
                
        }
        
        switch(arRoiBlanc[3]){     //étudie diag2
        
            case arReine[3]:
                k = 3;
                blnDiag2 = plusPres(arReine[3],arFou[3],arRoiBlanc[3],k);      //vérifie lequel est le plus près
            break;
            
            case arFou[3]:
                k = 3;
                blnDiag2 = plusPres(arReine[3],arFou[3],arRoiBlanc[3],k);      //vérifie lequel est le plus près
            break;
            
            default:
                blnDiag2 = false;
                arPieceEchec[3] = "N";
            
        }
        
        if(blnEnJeu[2] == true && blnDiag1 == true && blnEnJeu[1] == true && blnDiag2 == true){    //si la diag1 et la diag2 est échec et que la tour et le roi noir sont en jeu 
        
            strSens = "Diag1";                                             //vérifier l'obstacle sur la diag 1
            blnDiag1 = obstacles(strSens,arPieceEchec[2]);
            strSens = "Diag2";                                            //puis vérifier l'obstacle sur la diag 2
            blnDiag2 = obstacles(strSens,arPieceEchec[3]); 
            
        }else if(blnEnJeu[2] == true && blnDiag1 == true || blnEnJeu[1] == true && blnDiag1 == true ){    //si la diag1 est échec et que la tour et le roi noir sont en jeu
        
            strSens = "Diag1";                                    //vérifier l'obstacle sur la diag 1
            blnDiag1 = obstacles(strSens,arPieceEchec[2]);  
        
        }else if(blnEnJeu[2] == true && blnDiag2 == true || blnEnJeu[1] == true && blnDiag2 == true){   //si la diag2 est échec et que la tour et le roi noir sont en jeu
                                                              
            strSens = "Diag2";                                //vérifier l'obstacle sur la diag 2
            blnDiag2 = obstacles(strSens,arPieceEchec[3]);
        }
        
        if(blnDiag1 == true || blnDiag2 == true){
        
            return true;
            
        }else{
        
            return false;
            
        }
     
    }
    
    function plusPres(intReine,intAutreEchec1,intRoiBlanc,k){    
    
    /*Cette fonction sert à déterminer quelle pièce met le roi en échec. Elle vérifie sous quel axe elle étudie les positions
      puis elle vérifie quelle pièce met le roi en échec selon l'axe étudié pour l'ajouter dans le array des pièces qui mettent en échec*/
    
        var blnEchec = true;
        var intAutreEchec2; //Cette variable est associée à la rangée ou à la colonne alors que le intAutreEchec1 peut être  =  à une somme des deux pour la diagonale
        
        if(k == 2 || k == 3){                //Conditions pour définir les variables si la fonction a été déclenchée par la fonction vérifDiagonales
        
            intAutreEchec2 = arFou[k];
            intAutreEchec1 = arFou[1];
            intReine = arReine[1];
            intRoiBlanc = arRoiBlanc[1]; 
        
        }else{
        
            intAutreEchec2 = arTour[k];          //sinon définir les variables pour la colonne ou la rangée
        
        }
        
        if(arReine[k] != intAutreEchec2 ){       //si les deux pièces ne sont pas dans le même axe (rangée, row, diagonale1 ou diagonale 2) 
            
            switch(arRoiBlanc[k]){                     //vérifie si le roi blanc l'est pour l'une des deux et définit la pièce qui met en échec pour l'axe étudié
                
                case arReine[k]:
                
                  blnEchec = true;
                  arPieceEchec[k] = "R";
                  
                break;
                
                case intAutreEchec2:
                
                  blnEchec = true;
                  arPieceEchec[k] = "A";
                  
                break;
                
                default:
                
                  blnEchec = false;
                  arPieceEchec[k] = "N";
                
            }
        
        }else{                                                   //sinon vérifier pour les deux
            
            switch(true){                                     //définit si c'est la reine ou l'autre pièce qui met le roi en échec selon leur proximité du roi dans l'axe étudié
            
                case intRoiBlanc < intReine && intRoiBlanc < intAutreEchec1:       //si le roi blanc est le plus à gauche
                    
                    if(intReine < intAutreEchec1){                               // et que la reine est plus à gauche que l'autre pièce qui met en échec
                       
                        arPieceEchec[k] = "R";                                   //C'est la reine qui met en échec
                    
                    }else{
                       
                        arPieceEchec[k] = "A";
                    
                    }
                break;
                
                case intRoiBlanc > intReine && intRoiBlanc > intAutreEchec1:
               
                    if(intReine < intAutreEchec1){
                    
                        arPieceEchec[k] = "A";
                        
                    }else{
                    
                        arPieceEchec[k] = "R";
                        
                    }
                break;
                
                case intRoiBlanc < intReine && intRoiBlanc > intAutreEchec1:      //s'il sont de part et d'autre c'est les 2
                    
                    arPieceEchec[k] = "RA";
                    
                break;
                case intRoiBlanc > intReine && intRoiBlanc < intAutreEchec1:
                    
                    arPieceEchec[k] = "RA";
                    
                break;
                
                default:
                    
                    blnEchec = false;
                    arPieceEchec[k] = "N";
                    
            }
            
        }
                   
        return blnEchec;
    
    }
    
    function obstacles(strSens,strPieceEchec){
    
    /*Cette fonction sert à organiser la manière dont la fonction vérifEntre est utilisée.
      Elle définit quelles valeurs seront insérées dans la fonction vérifEntre selon plusieurs
      critères tel que l'axe étudiée, la pièce qui met en échec et si les obstacles potentiels sont en jeu.
      Cette fonction est très flexible, elle est complètement dépendante du contexte dans lequel elle est introduite,
      quelle fonction y fait appel et selon quelles circonstances particulières y sont associées.*/
      
        var k = 0;    //par défaut c'est l'étude d'une colonne
        var i = 1;
        var blnObstacle1 = false;   //l'obstruction pour arEchec1
        var blnObstacle2 = false;   //l'obstruction pour arEchec2
        var blnEchec = true;
        var arObstacle1;
        var RoiBlanc;
        var arObstacle2;
        var arEchec2;
        var arEchec1;
        
        if(strSens == "Row"){      //pour l'étude d'une rangée on inverse les valeurs variables k et i pour que le reste soit bien adapté
           
            k = 1;
            i = 0;
        
        }
        
        if (strSens!= "Diag1" && strSens!= "Diag2"){        //si c'est une colonne ou une rangée, on définit les valeurs des objets à étudier
        
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2]];  //pièce[x,y,si la pièce est en jeu]
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3]];
            arEchec2 = [arTour[0],arTour[1],blnEnJeu[1]];
            arObstacle2 = [arFou[0],arFou[1],blnEnJeu[4]];
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0]];
        
        }else if(strSens == "Diag1"){          // si c'est une diagonale 1 on définit les valeurs des objets à étudier
        
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3],parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1])];     //pièce[x,y,si la pièce est en jeu, la valeur associée à diag1]
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2],parseInt(arRoiNoir[0])+parseInt(arRoiNoir[1])];
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0],parseInt(arReine[0])+parseInt(arReine[1])];
            arEchec2 = [arFou[0],arFou[1],blnEnJeu[4],parseInt(arFou[0])+parseInt(arFou[1])];
            arObstacle2 = [arTour[0],arTour[1],blnEnJeu[1],parseInt(arTour[0])+parseInt(arTour[1])];
            k = 3       //pour que la vérification de la mise en échec par échec1 ou échec2 soit faite de manière adéquate (la valeur associée à diag1)
        
        }else if(strSens == "Diag2"){       // si c'est une diagonale 2 on définit les valeurs des objets à étudier
        
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3],7-parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1])];    //pièce[x,y,si la pièce est en jeu, la valeur associée à diag2]
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2],7-parseInt(arRoiNoir[0])+parseInt(arRoiNoir[1])];    
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0],7-parseInt(arReine[0])+parseInt(arReine[1])];
            arEchec2 = [arFou[0],arFou[1],blnEnJeu[4],7-parseInt(arFou[0])+parseInt(arFou[1])];
            arObstacle2 = [arTour[0],arTour[1],blnEnJeu[1],7-parseInt(arTour[0])+parseInt(arTour[1])];
            k = 3;       //pour que la vérification de la mise en échec par échec1 ou échec2 soit faite de manière adéquate (la valeur associée à diag2)
        
        }
         
        if(arObstacle1[2] == true && arObstacle2[2] == false){            //si seul l'obstacle 1 est en jeu
        
           switch(true){
           
              case strPieceEchec == "R" && arObstacle1[k] == RoiBlanc[k]:          //si c'est la reine qui met en échec et que l'obstacle 1 est sur le même axe que la reine et le roi blanc
              
                  blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);    //fait appel à la fonction vérifEntre avec les valeurs de positions sur l'axe perpendiculaires à celui étudié...
                 
                  if(blnObstacle1 == true){                                            //...sauf dans le cas d'une diagonale où il vérifie l'axe des y
                   
                    blnEchec = false;
                 
                  }
                  
              break;
              case strPieceEchec == "A" && arObstacle1[k] == RoiBlanc[k]:           //si c'est l'autre pièce qui met en échec et que l'obstacle 1 est sur le même axe que la reine et le roi blanc
              
                  blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);
                  
                  if(blnObstacle2 == true){
                 
                      blnEchec = false;
                 
                  }
                  
              break;                                              
              case strPieceEchec == "RA" && arObstacle1[k] == RoiBlanc[k]:            //si les la reine et l'autre pièce met le roi en échec
              
                  blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);    //vérifier pour l'obstacle1 pour l'autre pièce
                  blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);    //vérifier pour l'obstacle1 pour la reine
                 
                  if(blnObstacle1 == true && blnObstacle2 == true){
                 
                      blnEchec = false;
                
                  }
                  
              break;
           }
             
        }else if(arObstacle1[2] == false && arObstacle2[2] == true){    //si seul l'obstacle 2 est en jeu   (c'est comme pour l'obstacle1)
        
           switch(true){
           
              case strPieceEchec == "R" && arObstacle2[k] == RoiBlanc[k]:
              
                  blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);
                 
                  if(blnObstacle1 == true){
                
                      blnEchec = false;
                
                  }
                  
              break;
              case strPieceEchec == "A" && arObstacle2[k] == RoiBlanc[k]:
              
                  blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);
                  
                  if(blnObstacle2 == true){
                 
                      blnEchec = false;
                  
                  }
                  
              break;
              case strPieceEchec == "RA" && arObstacle2[k] == RoiBlanc[k]:
              
                  blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);
                  blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);
                 
                  if(blnObstacle1 == true && blnObstacle2 == true){
                 
                      blnEchec = false;
                
                  }
                  
              break;
           }  
           
        }else if(arObstacle1[2] == true && arObstacle2[2] == true){            //si les deux obstacles sont en jeu
        
            switch(true){
         
            case strPieceEchec == "R" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:    //si les 2 obstacles sont sur le même axe que le roi blanc  et que la reine le met en échec
            
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);          //vérifier l'obstacle2
                
                if(blnObstacle1 == false){                                                  //s'il n'empèche pas l'échec
               
                    blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);      //vérifier l'obstacle1
               
                }
               
                if(blnObstacle1 == true){      
               
                    blnEchec = false;
               
                }
                
            break;
            case strPieceEchec == "R" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k]!= RoiBlanc[k] :
            
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);
               
                if(blnObstacle1 == true){
               
                    blnEchec = false;
               
                }
                
            break;
            case strPieceEchec == "R" && arObstacle2[k]!= RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:
            
                blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);
               
                if(blnObstacle1 == true){
               
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "A" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:
            
                blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);
               
                if(blnObstacle2 == false){
               
                    blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);
              
                }
               
                if(blnObstacle1 == true){
              
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "A" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k]!= RoiBlanc[k] :
            
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);
               
                if(blnObstacle1 == true){
               
                    blnEchec = false;
               
                }
                
            break;
            case strPieceEchec == "A" && arObstacle2[k]!= RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:
            
                blnObstacle1 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);
              
                if(blnObstacle1 == true){
              
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "RA" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:     //si la reine et l'autre pièce met en échec et que les 2 obstacles sont en jeu
            
                blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);                 //vérifier l'obstruction par l'obstacle2 sur l'échec2
               
                if(blnObstacle2 == false){                                                        //si l'obstruction est toujours false
               
                    blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);          //vérifier l'obstruction par l'obstacle1 sur l'échec2
              
                }
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);               //vérifier l'obstruction par les obstacles sur l'échec1
               
                if(blnObstacle1 == false){
               
                    blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);
              
                }
              
                if(blnObstacle1 == true && blnObstacle2 == true){
              
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "RA" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k]!= RoiBlanc[k] :     //si seul obstacle2
            
                blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);                 //obstacle2 échec1
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);                 //obstacle2 échec2
               
                if(blnObstacle1 == true && blnObstacle2 == true){
              
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "RA" && arObstacle2[k]!= RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:
            
                blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);
                blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);
                
                if(blnObstacle1 == true && blnObstacle2 == true){
                
                    blnEchec = false;
               
                }
                
            break;
            
            } 
        
        }else{
        
            blnEchec = false;
            
        }
        
        return blnEchec;
      
    }
    
    function verifEntre(intObstacle,intEchec,intRoi){ 
        
    /*Cette fonction sert à vérifier si l'obstacle est entre le roi blanc et la pièce qui le met en échec*/
    
        var blnObstacle = false;
            
        if(intRoi > intEchec && intRoi > intObstacle){       //si le roi blanc est le plus à droite
        
            if(intObstacle > intEchec){                 //si l'obstacle est plus à droite que l'échec
            
            blnObstacle = true;
            
            }
        
        }else if(intRoi < intEchec && intRoi < intObstacle){   //si le roi blanc est le plus à gauche
        
            if(intObstacle < intEchec){                   //si l'obstacle est plus à gauche que l'échec
            
            blnObstacle = true;
            
            }
        
        }
        
        return blnObstacle;
    
    }