// JavaScript Document
/*Petit commentaire pour commencer: 

J'ai commenc� le projet tr�s t�t et je me suis avanc� rapidement, ne n'ai alors pas pu m'inspirer de ce que d'autres avait fait pour
certains aspects de mon algorithme. J'ai trait� le probl�me de la mani�re qui me semblait la plus simple c'est � dire une structure
de d�cision.Toutefois, la simplicit� du fonctionnement a men� � une complexit� du code qui est peut-�tre un peu excessive. J'�tais 
aussi tr�s absorb� par le challenge de faire int�ragir diverse fonctions et je tentais de d�couvrir comment les variables pouvaient
passer d'une fonction � l'autre et comment je pouvais rendre une fonction presque enti�rement d�pendante du contexte dans lequel 
elle avait �t� d�clench�e. Ce qui a probablement contribu� � la complexit� du code. Une partie de cette complexit� provient d'une
tentative d'expolration plus qu'une production nette d'un projet, mais puisque tout fonctionne tr�s bien et que j'avais fini tr�s t�t
j'ai d�cid� de ne pas le modifier. J'ai ajout� un maximum de commentaires pour faciliter la lecture, mais le code reste tr�s volumineux.*/

    //variables que j'ai cr��es pour isoler les valeurs en haut parce qu'elles sont une longue suite de string qui rendait la fonction ajusteMessage un peu (tr�s) laide
    var strDeadpoolImg = '<center><img src="https://media.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.gif" style="width:20vw ;height:20vw"></center>';
    var strInstructionsApresErreur = "Pas vite vite hein? On va reprendre �a du d�but! <br /><br />Il faut mettre <b><ins>au moins les 2 rois et une autre pi�ce</ins></b> sur l'�chiquier pour commencer le jeu.<br /><br /> Il faut cliquer sur une pi�ce pour la s�lectionner, puis cliquer sur la case de l'�chiquer sur laquelle tu veux poser la pi�ce.";            
    var strCommentaireApresErreur = "<div style='font-size:1.5em; text-align:center'>Il faut lire les instructions...</div><br />";
    var strInstructionsInitiales = "Il faut mettre au moins les 2 rois et une autre pi�ce sur l'�chiquier pour commencer le jeu.<br /><br /> Pour ce faire, il faut cliquer sur une pi�ce pour la s�lectionner, puis cliquer sur la case de l'�chiquer sur laquelle tu veux poser la pi�ce.";
    var strCommentaireAutoEchec = "<div style='font-size:1.5em; text-align:center'>Tu ne peux pas aller l�!<br /> Tu te metterais en auto-�chec...</div><br />";
    var strImgAutoEchec = "<center><img src='https://media.giphy.com/media/WyrdDeIxGOlQA/giphy.gif' style='width:20vw ;height:20vw'></center>";
    var strInstructionsEnJeu = "Tu peux placer les pi�ces o� tu le d�sires. Elles ne sont pas restreintes � un mouvement particulier, mais l'auto-�chec est interdit. Tu peux aussi ajouter les pi�ces qui ne sont pas encore en jeu si tu veux.";
    var strImgEchec = "<center><div>Le roi blanc:</div><div><img src='https://bit.ly/33vmcXF' style='width:20vw ;height:13vw'></div></center>";
    var strImgMat = "<center><div>Le roi blanc:</div><div><img src='https://bit.ly/2L3Q1rU' style='width:20vw ;height:13vw'></div></center>"; 
    
    //variables n�cessaires  
    var arReine = ["pas en jeu","pas en jeu",,]             //Position des pi�ces :[col,row,diag1,diag2]
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
    var arPieceEchec = ["N","N","N","N"];   //quelle pi�ce met le roi en �chec sur[col,row,diag1,diag2] : N = none, R = reine, A = autre (soit le fou ou la tour)
    var strContexte                         //variable interm�diaire pour ajuster les messages en fonction du contexte
    
    function bouger(element){
    
    /*cette fonction sert � d�placer les pi�ces et � ajuster les messages/instructions en fonction
      des conditions de pret � jouer et d'auto-�chec. Elle sert aussi de point d'ancrage � toutes les autres
      fonctions qui seront utilis�es selon une structure de d�cision �tal�e sur plusieurs fonctions*/
      
        var strRoiBouge;              //Le nom du roi qui est boug�
        var strPosRoiBouge;           //La position o� l'on tente de placer le roi qui est boug�
        var blnAutoEchec = false;
        var blnPlaceLaPiece;          //variable de condition de placer la pi�ce
        
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
                      strIdAncien = element.id;           //retire la pi�ce de la case
                      strBouge = element.className;
                      element.className = "rouge";
                     
                  }
                  
                  ajusteMessage(strContexte); 
                  
              }else{
              
                    if(blnPretAJouer == false && parseInt(element.id) == element.id && parseInt(strIdAncien) == strIdAncien && element.className != "rouge"){    //d�terminer si on peut mettre la piece selon certaines conditions
                        
                        blnPlaceLaPiece = false;
                        strContexte = "conditionNonRespectee";
                       
                        
                    }else{
                     
                        blnPlaceLaPiece = true;
                        strContexte = "initial+position";
                       
                     
                     }  
                     
                     if(blnPlaceLaPiece == true){
                     
                         if(element.className == "cases" || element.className == "rouge" ){   //condition permettant seulement de placer la pi�ce dans une case vide
                              
                              if(strBouge == "cases roiBlanc" && blnEnJeu[2] == true || strBouge == "cases roiNoir" && blnEnJeu[3] == true){
                              
                                  strPosRoiBouge = element.id;   //d�finit la position o� le roi est boug� si c'est un roi qui est boug�
                                  
                                  if(strBouge == "cases roiBlanc"){  // d�finit quel roi est boug�
                                  
                                      strRoiBouge = "B";
                                      
                                  }else{
                                  
                                      strRoiBouge = "N";
                                      
                                  }
                                  
                                  blnAutoEchec = verifAutoEchec(strRoiBouge,strPosRoiBouge); //v�rifie le conflit d'auto-�chec lorsque l'on place les deux rois c�te � c�te
                                  
                              } 
                               
                              if(blnAutoEchec == false){     
                               
                                       blnBouge = true;
                                       
                                       if(element.className != "rouge"){                  //place la pi�ce
                                       
                                            document.getElementById(strIdAncien).className = "cases";
                                            
                                       }else{                                             //place la pi�ce red�poser la pi�ce
                                       
                                            document.getElementById(strIdAncien).className = strBouge;
                                            
                                       }  
                                                                              
                                       element.className = strBouge;
                                       positionDesPieces(element.classList.item(1),element.id);  //mise � jour de la position des pi�ces apr�s chaque d�placement
                                       verifConditions();
                                       
                                       if(blnPretAJouer == false){             //si les conditions de pret � jouer ne sont pas rencontr�s
                                        
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
    
    /* Cette fonction sert � v�rifier si les conditions de pr�t � jouer sont respect�es*/
    
        if(blnEnJeu[3] != true || blnEnJeu[5] != true || blnEnJeu[2] != true){
        
            blnPretAJouer = false;
            
        }else{
        
            blnPretAJouer = true;
        
        }
    
    }
    
    function ajusteMessage(strContext){
    
    /*Cette fonction sert � ajuster les �l�ments de l'interface en fonction du contexte d�finit dans la fonction bouger*/
     
        if(strContext == "mat"){                       //Pour �viter la r�p�tition 
        
        document.getElementById("body").style.backgroundColor = "red"; 
        
        }else{
        
        document.getElementById("body").style.backgroundColor = "lightblue";
        
        }
        if(strContext != "autoEchec"){                 //Pour �viter la r�p�tition 
        
        document.getElementById("msgHeader").innerHTML = "";
        
        }
        
        if(strContext == "conditionNonRespectee"){
        
          document.getElementById("strMessage").innerHTML = strDeadpoolImg;
          document.getElementById("instructions").innerHTML = strInstructionsApresErreur;
          document.getElementById("msgHeader").innerHTML = strCommentaireApresErreur;
          document.getElementById("header").innerHTML = "Aimes-tu les �checs?";
          document.getElementById("header").className = "normalHeader";
 
          
        }else if(strContext == "mat"){
        
          document.getElementById("header").className = "echecEtMat";
          document.getElementById("header").innerHTML = "�chec et Mat!";
          document.getElementById("strMessage").innerHTML = strImgMat;
        
        }else if(strContext == "autoEchec"){
         
           strMsgHeader = strCommentaireAutoEchec; 
           document.getElementById("strMessage").innerHTML = strImgAutoEchec;
           document.getElementById("msgHeader").innerHTML = strMsgHeader; 
         
        }else if(strContext == "initial+position"){
        
          MessagePosition()
          document.getElementById("header").innerHTML = "Aimes-tu les �checs?";
          document.getElementById("header").className = "normalHeader";
          document.getElementById("instructions").innerHTML = strInstructionsInitiales;
          document.getElementById("strMessage").innerHTML = strMessage;
        
        }else if(strContext == "enJeu"){
        
          MessagePosition()
          document.getElementById("instructions").innerHTML = strInstructionsEnJeu;        
          document.getElementById("strMessage").innerHTML = strMessage;
        
        }else if(strContext == "echec"){
        
          document.getElementById("header").innerHTML = "�chec!";
          document.getElementById("header").className = "echec";
          document.getElementById("strMessage").innerHTML = strImgEchec;
        
        }
     
     }
    
    function MessagePosition(){
    
    /*cette fonction sert � ajuster le message indiquant la position des pi�ces dans le div*/
    
        strMessage = " <div id = 'msg'>  <div style = 'font-size:1.5em'> La position des pi�ces:  </div> ";
        
        if(blnEnJeu[0] == true){
           strMessage += " <div>La Reine: Colonne "+arReine[0]+", Rang�e "+arReine[1]+"</div>"
        }else{
           strMessage += "<div>La Reine n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[1] == true){
           strMessage += "<div>La Tour: Colonne "+arTour[0]+", Rang�e "+arTour[1]+"</div>"
        }else{
           strMessage += "<div>La Tour n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[4] == true){
           strMessage += "<div>Le fou: Colonne "+arFou[0]+", Rang�e "+arFou[1]+"</div>"
        }else{
           strMessage += "<div>Le fou n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[2] == true){
           strMessage += "<div>Le Roi Noir: Colonne "+arRoiNoir[0]+", Rang�e "+arRoiNoir[1]+"</div>"
        }else{
           strMessage += "<div>Le Roi Noir n'est pas en jeu</div>"
        }
        
        if(blnEnJeu[3] == true){
           strMessage += "<div>Le Roi Blanc: Colonne "+arRoiBlanc[0]+", Rang�e "+arRoiBlanc[1]+"</div>";
        }else{
           strMessage += "<div>Le Roi Blanc n'est pas en jeu</div>";
        }
        
        return strMessage
        
    }
    
    function verifAutoEchec(strRoiBouge,intPosition){
    
    /*cette fonction sert � v�rifier si la position � laquelle le joueur
    tente de placer l'un des deux roi est une position adjacente � l'autre roi ce qui
    causerait un �tat d'auto-�chec interdit*/
    
        var intPositionX = parseInt(intPosition.substr(1,1));
        var intPositionY = parseInt(intPosition.substr(2,1));
        var blnAutoEchec = false;
        var arRoiStable;    //le roi qui n'est pas en train de se faire d�placer
        
        if(strRoiBouge == "N"){
        
            arRoiStable = arRoiBlanc;
            
        }else if(strRoiBouge == "B"){
        
            arRoiStable = arRoiNoir;
            
        } 
        switch(true){                      //�tale les situations dans laquelle il y a auto-�chec
              
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
    
    /*Cette fonction sert � mettre � jour les positions des pi�ces apr�s chaque d�placement*/
    
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
        
            switch(strPiece){                                      //�tale les situations selon la pi�ce boug�e
            
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
        
        if(blnEnJeu[0] == false && blnEnJeu[1] == false && blnEnJeu[4] == false ){    //les 4 autres que le roi blanc hors jeu en m�me temps
        
           blnEnJeu[5] = false; 
                            
        }else{
        
           blnEnJeu[5] = true;
           
        }
         
        arRoiBlanc = arRoiBlancPositionFixe;          //Red�finition du arRoiBlanc si le roi blanc est sorti du jeu
         
     }
     
     function verifMat(){
     
     /*cette fonction sert � v�rifier si le roi blanc est en �chec et mat*/
     
        var blnMat = true;
        var intPositionX = arRoiBlancPositionFixe[0];    //position en X variate
        var intPositionY = arRoiBlancPositionFixe[1];    //position en Y variante        
        
        if(parseInt(arRoiBlancPositionFixe[1]) < 7 && blnMat == true){    //conditions afin de rester en jeu. Si le roi est � l'une des extr�mit� il ne v�rifiera pas certaines cases qui seraient hors-jeu    
            
            intPositionX = arRoiBlancPositionFixe[0];                   //d�finition d'une case � �tudier
            intPositionY = (arRoiBlancPositionFixe[1]+1);     
            arRoiBlanc = [intPositionX,intPositionY];                   //red�finition de arRoiBlanc pour que les fonctions de sous routines n'aient pas � s'adapter
            blnMat = verifEchecAutours();                               //v�rifier l'�chec sur la position �tudi�e
        
        }
        
        if(parseInt(arRoiBlancPositionFixe[1]) > 0 && blnMat == true){    //tant que blnMat est true, continuera de v�rifier les cases adjacentes en jeu
           
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
        
        arRoiBlanc = arRoiBlancPositionFixe;  //r�finition de arRoiBlanc afin d'annuler l'impact de cette fonction sur sa valeur pour la suite
        
        return blnMat;
    
    }
    
    function verifEchecAutours(){
         
    /*Cette fonction v�rifie si la case adjacente est mise en �chec sur l'un des 4 axes*/
      
        var blnMat = true;
        
        if(blnMat == true){
        
            blnMat = verifCol();   //v�rifie la colonne sur la case adjacente correspondant � arRoiBlanc au moment o� elle a �t� appel�e
        
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
    
    /*cette fonction sert uniquement � prendre en compte le roi noir dans l'�chec et mat car il ne peut
      pas mettre le roi blanc directement en �chec mais il peut mettre la case adjacente en �chec. Elle
      organise la mani�re dont la fonction verifRoiNoir se comportera en fonction de la position relative
      du roi noir en fonction de la case adjacente au roi blanc qui est �tudi�e*/
         
        var blnEchec;
        var i;
        
        switch(true){
        
            case arRoiNoir[0] == (arRoiBlanc[0]+1):
                i = 1;
                blnEchec = verifRoiNoir(i);    //fait appel � la fonction suivante  pour optimiser le code (r�p�tition de la m�me action)
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
    
    /*cette fonction sert � v�rifier si l'une des 3 cases adjacente du c�t�s du roi noir �tudi� est
      au m�me endroit que la position adjacente du roi blanc qui est �tudi�e*/
    
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
    
    /*cette fonction v�rifie si le roi blanc est en �chec et organise la fa�on dont l'interface
    se comporte selon les diff�rents cas possibles*/
    
        var blnMat;
        var blnRow;
        var blnCol;
        var blnDiag;
          
        arRoiBlanc = arRoiBlancPositionFixe;
        blnCol = verifCol();
        blnRow = verifRow();
        blnDiag = verifDiag();
        
        if(blnCol == true || blnRow == true || blnDiag == true){     //v�rifie le mat uniquement si le roi blanc est en �chec
           
           blnMat = verifMat();
           
           if(blnMat == false){
           
              strContexte="echec"
           
           }else{
           
              strContexte="mat"
           
           }
         
        }

    }
    
    function verifRow(){
    
    /*cette fonction organise la v�rification de l'�chec du roi blanc sur l'axe des Y*/
    
        var blnRow = false;
        var strSens = "Row";
        var k = 1;         //puisque pi�ce[1] = position en Y
          
        if(blnEnJeu[0] == true || blnEnJeu[1] == true){     //si la reine ou la tour est en jeu
          
          if(arReine[1] == arRoiBlanc[1] || arTour[1] == arRoiBlanc[1]){    //si la reine ou la tour est sur la m�me rang�e que le roi blanc
             
            blnRow = true; 
            plusPres(arReine[0],arTour[0],arRoiBlanc[0],k);        //v�rifier lequel met le roi blanc en �chec
          
          } 
          
        }
        
        if(blnEnJeu[2] == true && blnRow == true || blnEnJeu[4] == true && blnRow == true){         //si le fou ou le roi noir est en jeu
             
          blnRow = obstacles(strSens,arPieceEchec[1]);                                    //v�rifier les obstacles
          
        }
        
        return blnRow;
       
    }
    
    function verifCol(){
    
    /*cette fonction organise la v�rification de l'�chec du roi blanc sur l'axe des X*/
    
        var blnCol = false;
        var strSens = "Col";
        var k = 0;         //puisque pi�ce[0] = position en X
        
        if(blnEnJeu[0] == true || blnEnJeu[1] == true){      //si la reine ou la tour est en jeu
        
           if(arReine[0] == arRoiBlanc[0] || arTour[0] == arRoiBlanc[0]){  //si la reine ou la tour est sur la m�me colonne que le roi blanc
            
             blnCol = true; 
             plusPres(arReine[1],arTour[1],arRoiBlanc[1],k);      //v�rifier lequel met le roi blanc en �chec
             
          }
           
        }
        
        if(blnEnJeu[2] == true && blnCol == true || blnEnJeu[4] == true && blnCol == true){      //si le fou ou le roi noir est en jeu
        
            blnCol = obstacles(strSens,arPieceEchec[0]);                                   //v�rifier les obstacles
            
        }
                               
        return blnCol 
      
    }
    
    function verifDiag(){
    
    /*cette fonction sert � v�rifier si le roi blanc est mis en �chec sur l'une des 2 diagonales*/
    
        var strSens;
        var blnDiag1;
        var blnDiag2;
          
        arRoiBlanc[2] = parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1]);   //arRoiBlanc[x,y,diag1,diag2]
        arRoiBlanc[3] = 7-parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1]);
          
        switch(arRoiBlanc[2]){     //�tudie diag1
        
            case arReine[2]:
                k = 2;
                blnDiag1 = plusPres(arReine[2],arFou[2],arRoiBlanc[2],k);      //v�rifie lequel est le plus pr�s
            break;
            
            case arFou[2]:
                k = 2;
                blnDiag1 = plusPres(arReine[2],arFou[2],arRoiBlanc[2],k);      //v�rifie lequel est le plus pr�s
            break;
            
            default:
                blnDiag1 = false;
                arPieceEchec[2] = "N";
                
        }
        
        switch(arRoiBlanc[3]){     //�tudie diag2
        
            case arReine[3]:
                k = 3;
                blnDiag2 = plusPres(arReine[3],arFou[3],arRoiBlanc[3],k);      //v�rifie lequel est le plus pr�s
            break;
            
            case arFou[3]:
                k = 3;
                blnDiag2 = plusPres(arReine[3],arFou[3],arRoiBlanc[3],k);      //v�rifie lequel est le plus pr�s
            break;
            
            default:
                blnDiag2 = false;
                arPieceEchec[3] = "N";
            
        }
        
        if(blnEnJeu[2] == true && blnDiag1 == true && blnEnJeu[1] == true && blnDiag2 == true){    //si la diag1 et la diag2 est �chec et que la tour et le roi noir sont en jeu 
        
            strSens = "Diag1";                                             //v�rifier l'obstacle sur la diag 1
            blnDiag1 = obstacles(strSens,arPieceEchec[2]);
            strSens = "Diag2";                                            //puis v�rifier l'obstacle sur la diag 2
            blnDiag2 = obstacles(strSens,arPieceEchec[3]); 
            
        }else if(blnEnJeu[2] == true && blnDiag1 == true || blnEnJeu[1] == true && blnDiag1 == true ){    //si la diag1 est �chec et que la tour et le roi noir sont en jeu
        
            strSens = "Diag1";                                    //v�rifier l'obstacle sur la diag 1
            blnDiag1 = obstacles(strSens,arPieceEchec[2]);  
        
        }else if(blnEnJeu[2] == true && blnDiag2 == true || blnEnJeu[1] == true && blnDiag2 == true){   //si la diag2 est �chec et que la tour et le roi noir sont en jeu
                                                              
            strSens = "Diag2";                                //v�rifier l'obstacle sur la diag 2
            blnDiag2 = obstacles(strSens,arPieceEchec[3]);
        }
        
        if(blnDiag1 == true || blnDiag2 == true){
        
            return true;
            
        }else{
        
            return false;
            
        }
     
    }
    
    function plusPres(intReine,intAutreEchec1,intRoiBlanc,k){    
    
    /*Cette fonction sert � d�terminer quelle pi�ce met le roi en �chec. Elle v�rifie sous quel axe elle �tudie les positions
      puis elle v�rifie quelle pi�ce met le roi en �chec selon l'axe �tudi� pour l'ajouter dans le array des pi�ces qui mettent en �chec*/
    
        var blnEchec = true;
        var intAutreEchec2; //Cette variable est associ�e � la rang�e ou � la colonne alors que le intAutreEchec1 peut �tre  =  � une somme des deux pour la diagonale
        
        if(k == 2 || k == 3){                //Conditions pour d�finir les variables si la fonction a �t� d�clench�e par la fonction v�rifDiagonales
        
            intAutreEchec2 = arFou[k];
            intAutreEchec1 = arFou[1];
            intReine = arReine[1];
            intRoiBlanc = arRoiBlanc[1]; 
        
        }else{
        
            intAutreEchec2 = arTour[k];          //sinon d�finir les variables pour la colonne ou la rang�e
        
        }
        
        if(arReine[k] != intAutreEchec2 ){       //si les deux pi�ces ne sont pas dans le m�me axe (rang�e, row, diagonale1 ou diagonale 2) 
            
            switch(arRoiBlanc[k]){                     //v�rifie si le roi blanc l'est pour l'une des deux et d�finit la pi�ce qui met en �chec pour l'axe �tudi�
                
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
        
        }else{                                                   //sinon v�rifier pour les deux
            
            switch(true){                                     //d�finit si c'est la reine ou l'autre pi�ce qui met le roi en �chec selon leur proximit� du roi dans l'axe �tudi�
            
                case intRoiBlanc < intReine && intRoiBlanc < intAutreEchec1:       //si le roi blanc est le plus � gauche
                    
                    if(intReine < intAutreEchec1){                               // et que la reine est plus � gauche que l'autre pi�ce qui met en �chec
                       
                        arPieceEchec[k] = "R";                                   //C'est la reine qui met en �chec
                    
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
    
    /*Cette fonction sert � organiser la mani�re dont la fonction v�rifEntre est utilis�e.
      Elle d�finit quelles valeurs seront ins�r�es dans la fonction v�rifEntre selon plusieurs
      crit�res tel que l'axe �tudi�e, la pi�ce qui met en �chec et si les obstacles potentiels sont en jeu.
      Cette fonction est tr�s flexible, elle est compl�tement d�pendante du contexte dans lequel elle est introduite,
      quelle fonction y fait appel et selon quelles circonstances particuli�res y sont associ�es.*/
      
        var k = 0;    //par d�faut c'est l'�tude d'une colonne
        var i = 1;
        var blnObstacle1 = false;   //l'obstruction pour arEchec1
        var blnObstacle2 = false;   //l'obstruction pour arEchec2
        var blnEchec = true;
        var arObstacle1;
        var RoiBlanc;
        var arObstacle2;
        var arEchec2;
        var arEchec1;
        
        if(strSens == "Row"){      //pour l'�tude d'une rang�e on inverse les valeurs variables k et i pour que le reste soit bien adapt�
           
            k = 1;
            i = 0;
        
        }
        
        if (strSens!= "Diag1" && strSens!= "Diag2"){        //si c'est une colonne ou une rang�e, on d�finit les valeurs des objets � �tudier
        
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2]];  //pi�ce[x,y,si la pi�ce est en jeu]
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3]];
            arEchec2 = [arTour[0],arTour[1],blnEnJeu[1]];
            arObstacle2 = [arFou[0],arFou[1],blnEnJeu[4]];
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0]];
        
        }else if(strSens == "Diag1"){          // si c'est une diagonale 1 on d�finit les valeurs des objets � �tudier
        
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3],parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1])];     //pi�ce[x,y,si la pi�ce est en jeu, la valeur associ�e � diag1]
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2],parseInt(arRoiNoir[0])+parseInt(arRoiNoir[1])];
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0],parseInt(arReine[0])+parseInt(arReine[1])];
            arEchec2 = [arFou[0],arFou[1],blnEnJeu[4],parseInt(arFou[0])+parseInt(arFou[1])];
            arObstacle2 = [arTour[0],arTour[1],blnEnJeu[1],parseInt(arTour[0])+parseInt(arTour[1])];
            k = 3       //pour que la v�rification de la mise en �chec par �chec1 ou �chec2 soit faite de mani�re ad�quate (la valeur associ�e � diag1)
        
        }else if(strSens == "Diag2"){       // si c'est une diagonale 2 on d�finit les valeurs des objets � �tudier
        
            RoiBlanc = [arRoiBlanc[0],arRoiBlanc[1],blnEnJeu[3],7-parseInt(arRoiBlanc[0])+parseInt(arRoiBlanc[1])];    //pi�ce[x,y,si la pi�ce est en jeu, la valeur associ�e � diag2]
            arObstacle1 = [arRoiNoir[0],arRoiNoir[1],blnEnJeu[2],7-parseInt(arRoiNoir[0])+parseInt(arRoiNoir[1])];    
            arEchec1 = [arReine[0],arReine[1],blnEnJeu[0],7-parseInt(arReine[0])+parseInt(arReine[1])];
            arEchec2 = [arFou[0],arFou[1],blnEnJeu[4],7-parseInt(arFou[0])+parseInt(arFou[1])];
            arObstacle2 = [arTour[0],arTour[1],blnEnJeu[1],7-parseInt(arTour[0])+parseInt(arTour[1])];
            k = 3;       //pour que la v�rification de la mise en �chec par �chec1 ou �chec2 soit faite de mani�re ad�quate (la valeur associ�e � diag2)
        
        }
         
        if(arObstacle1[2] == true && arObstacle2[2] == false){            //si seul l'obstacle 1 est en jeu
        
           switch(true){
           
              case strPieceEchec == "R" && arObstacle1[k] == RoiBlanc[k]:          //si c'est la reine qui met en �chec et que l'obstacle 1 est sur le m�me axe que la reine et le roi blanc
              
                  blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);    //fait appel � la fonction v�rifEntre avec les valeurs de positions sur l'axe perpendiculaires � celui �tudi�...
                 
                  if(blnObstacle1 == true){                                            //...sauf dans le cas d'une diagonale o� il v�rifie l'axe des y
                   
                    blnEchec = false;
                 
                  }
                  
              break;
              case strPieceEchec == "A" && arObstacle1[k] == RoiBlanc[k]:           //si c'est l'autre pi�ce qui met en �chec et que l'obstacle 1 est sur le m�me axe que la reine et le roi blanc
              
                  blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);
                  
                  if(blnObstacle2 == true){
                 
                      blnEchec = false;
                 
                  }
                  
              break;                                              
              case strPieceEchec == "RA" && arObstacle1[k] == RoiBlanc[k]:            //si les la reine et l'autre pi�ce met le roi en �chec
              
                  blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);    //v�rifier pour l'obstacle1 pour l'autre pi�ce
                  blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);    //v�rifier pour l'obstacle1 pour la reine
                 
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
         
            case strPieceEchec == "R" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:    //si les 2 obstacles sont sur le m�me axe que le roi blanc  et que la reine le met en �chec
            
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);          //v�rifier l'obstacle2
                
                if(blnObstacle1 == false){                                                  //s'il n'emp�che pas l'�chec
               
                    blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);      //v�rifier l'obstacle1
               
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
            case strPieceEchec == "RA" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k] == RoiBlanc[k]:     //si la reine et l'autre pi�ce met en �chec et que les 2 obstacles sont en jeu
            
                blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);                 //v�rifier l'obstruction par l'obstacle2 sur l'�chec2
               
                if(blnObstacle2 == false){                                                        //si l'obstruction est toujours false
               
                    blnObstacle2 = verifEntre(arObstacle1[i],arEchec2[i],RoiBlanc[i]);          //v�rifier l'obstruction par l'obstacle1 sur l'�chec2
              
                }
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);               //v�rifier l'obstruction par les obstacles sur l'�chec1
               
                if(blnObstacle1 == false){
               
                    blnObstacle1 = verifEntre(arObstacle1[i],arEchec1[i],RoiBlanc[i]);
              
                }
              
                if(blnObstacle1 == true && blnObstacle2 == true){
              
                    blnEchec = false;
              
                }
                
            break;
            case strPieceEchec == "RA" && arObstacle2[k] == RoiBlanc[k] && arObstacle1[k]!= RoiBlanc[k] :     //si seul obstacle2
            
                blnObstacle2 = verifEntre(arObstacle2[i],arEchec2[i],RoiBlanc[i]);                 //obstacle2 �chec1
                blnObstacle1 = verifEntre(arObstacle2[i],arEchec1[i],RoiBlanc[i]);                 //obstacle2 �chec2
               
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
        
    /*Cette fonction sert � v�rifier si l'obstacle est entre le roi blanc et la pi�ce qui le met en �chec*/
    
        var blnObstacle = false;
            
        if(intRoi > intEchec && intRoi > intObstacle){       //si le roi blanc est le plus � droite
        
            if(intObstacle > intEchec){                 //si l'obstacle est plus � droite que l'�chec
            
            blnObstacle = true;
            
            }
        
        }else if(intRoi < intEchec && intRoi < intObstacle){   //si le roi blanc est le plus � gauche
        
            if(intObstacle < intEchec){                   //si l'obstacle est plus � gauche que l'�chec
            
            blnObstacle = true;
            
            }
        
        }
        
        return blnObstacle;
    
    }