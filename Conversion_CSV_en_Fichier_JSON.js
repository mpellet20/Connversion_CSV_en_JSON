var obj_csv = {
                    size:0,
                    dataFile:[]
        };
        
        let csvData = [];

function readImage(input) {
    console.log(input)
 	if (input.files && input.files[0]) {
		let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
		reader.onload = function (e) {
 			console.log(e);
			obj_csv.size = e.total;
			obj_csv.dataFile = e.target.result
            console.log(obj_csv.dataFile)
            parseData(obj_csv.dataFile)
            
		}
	}
}

function parseData(data){
    // let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    // console.table(csvData);
    document.getElementById("FichierTexte_CSV").value = csvData;
    //data.replace("\n",",");
    
}

function Convertir_en_fichier_JSON()
{
    var str = document.getElementById("FichierTexte_CSV").value;
    var str2 = str;
    var res_key = str.split(",");
    var lines = str2.split("\n");
    var keys = lines[0].split(",");
    var Resultat = "";
    var double_quote = '"';
    var indentation = "      ";
    var index = 0;
    var temp = "";
        
    Resultat += "{" + "\n" + double_quote + document.getElementById("nom_variable_structure").value + double_quote + ": [" + "\n";
    for (j=1;j<=(lines.length)-2;j=j+1) {
    
    Resultat += "{" + "\n";
    index = index + 9;
    for (i = 0; i<=keys.length-2; i++) {
      
        Resultat += indentation + double_quote + res_key[i] + double_quote + " : " + double_quote + res_key[i+index] + double_quote + "," + "\n";        
    }
    let temp = String(res_key[i]);
    let temp2 = String(res_key[i+index]);
    
    let last = temp.lastIndexOf("\n");
    let last2 = temp2.lastIndexOf("\n");
    Resultat += indentation + double_quote + temp.substring(0,last) + double_quote + " : " + double_quote + temp2.substring(0,last2) + double_quote + "\n";    //res_key[i+index]
    Resultat += "}," + "\n";
    }
    Resultat += "{" + "\n";
    index = index + 9;
    for (i = 0; i<=keys.length-2; i++) {
      
        Resultat += indentation + double_quote + res_key[i] + double_quote + " : " + double_quote + res_key[i+index] + double_quote + "," + "\n";        
    }
    temp = String(res_key[i]);
    temp2 = String(res_key[i+index]);
    
    last = temp.lastIndexOf("\n");
    last2 = temp2.lastIndexOf("\n");
    Resultat += indentation + double_quote + temp.substring(0,last) + double_quote + " : " + double_quote + temp2.substring(0,last2) + double_quote + "\n";    //res_key[i+index]
    Resultat += "}" + "\n";
    
 
    Resultat += "\n";
    
    Resultat += "]" + "\n" + "}";
    document.getElementById("Resultat_FichierJSON").value = Resultat;
}

function Reinitier() {
    document.getElementById("FichierTexte_CSV").value = "";
    document.getElementById("Resultat_FichierJSON").value = "";

}

function Copier() {
  var copyText = document.getElementById("Resultat_FichierJSON");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
}
