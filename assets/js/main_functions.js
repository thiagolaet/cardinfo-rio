function getParameter(){
    var url_string = window.location.href;
    var urlarr = url_string.split('/');
    url_string = urlarr[urlarr.length-1];

    if(url_string.split('?')[1] != null){
        url_string = url_string.split('?')[1];
        urlarr = url_string.split('&');
        var i = 0;
        var js = '{';
        for (i=0;i<urlarr.length;i++){
            var temp = urlarr[i].split('=');
            js=js+'"'+temp[0]+'":"'+temp[1]+'"';
            if(i!=urlarr.length-1){
                js=js+', ';
            }
        }
        js = js+'}';
        urlarr = JSON.parse(js);
        return urlarr;
    }
    return new Array();
}

function setPageByParameter(){
    var filtro = document.getElementById("filtro");
    var tempd = "Doenças: "
    var arrDoencas = Array();
    var arrRegiao = Array();
    arrRegiao["todas"] = "Todas";
    arrRegiao["medio_paraiba"] = "Médio Paraíba";
    arrRegiao["baixada_litoranea"] = "Baixada Litorânea";
    arrRegiao["noroeste_fluminense"] = "Noroeste Fluminense";
    arrRegiao["norte_fluminense"] = "Norte Fluminense";
    arrRegiao["centro_sul"] = "Centro-Sul";
    arrRegiao["serrana"] = "Serrana";
    arrRegiao["metropolitana_ii"] = "Metropolitana II";
    arrRegiao["metropolitana_i"] = "Metropolitana I";
    arrRegiao["baia_ilha_grande"] = "Baía da Ilha Grande";
    var cont = 0;

    if(getParameter()["regiao"]!=null){
        document.getElementById("regiao").value = getParameter()["regiao"];
        document.getElementById(getParameter()["regiao"]).style.fill = "#2f2f2f";
        document.getElementById("regiao_txt").innerHTML = "Região Selecionada: "+arrRegiao[getParameter()["regiao"]];
        filtro.innerHTML = "Região: "+arrRegiao[getParameter()["regiao"]]+" &nbsp &nbsp ";
    }else{
        document.getElementById("regiao").value = "todas";
        document.getElementById("todas").style.fill = "#2f2f2f";
        document.getElementById("regiao_txt").innerHTML = "Região Selecionada: Todas";
        filtro.innerHTML = "Região: Todas &nbsp &nbsp ";
    }

    if(getParameter()["DAC"]!=null){
        if(getParameter()["DAC"]=="on"){
            document.getElementById("DAC").checked = true;
            arrDoencas.push("DAC");
        }
    }
    else{
        document.getElementById("DAC").checked = false;
        cont++;
    }
    if(getParameter()["DIC"]!=null){
        if(getParameter()["DIC"]=="on"){
            document.getElementById("DIC").checked = true;
            arrDoencas.push("DIC");
        }
    }
    else{
        document.getElementById("DIC").checked = false;
        cont++;
    }
    if((getParameter()["DCBV"]!=null)){
        if(getParameter()["DCBV"]=="on"){
            document.getElementById("DCBV").checked = true;
            arrDoencas.push("DCBV");
        }
    }
    else{
        document.getElementById("DCBV").checked = false;
        cont++;
    }

    if(cont==3){
        document.getElementById("DAC").checked = true;
        document.getElementById("DIC").checked = false;
        document.getElementById("DCBV").checked = false;
        arrDoencas.push("DAC");
    }
    var c = 0;
    do{
      if(c>0){
        tempd+=", "
      }
      tempd += arrDoencas[c];
      c++;
    }while(c<arrDoencas.length);
    tempd+=" &nbsp &nbsp ";
    filtro.innerHTML+=tempd;

    if(getParameter()["tempo"]!=null){
        if(getParameter()["tempo"]=="A"){
            document.getElementsByName("tempo")[0].checked = true;
            filtro.innerHTML += "Tempo: Ano de "+ new Date().getFullYear();
        }
        else if(getParameter()["tempo"]=="M"){
            document.getElementsByName("tempo")[1].checked = true;
            var m = new Date().getMonth();
            switch (m) {
              case 0:
                filtro.innerHTML += "Tempo: Mês de Janeiro";
                break;
              case 1:
                  filtro.innerHTML += "Tempo: Mês de Fevereiro";
                  break;
              case 2:
                  filtro.innerHTML += "Tempo: Mês de Março";
                  break;
              case 3:
                  filtro.innerHTML += "Tempo: Mês de Abril";
                  break;
              case 4:
                  filtro.innerHTML += "Tempo: Mês de Maio";
                  break;
              case 5:
                  filtro.innerHTML += "Tempo: Mês de Junho";
                  break;
              case 6:
                  filtro.innerHTML += "Tempo: Mês de Julho";
                  break;
              case 7:
                  filtro.innerHTML += "Tempo: Mês de Agosto";
                  break;
              case 8:
                  filtro.innerHTML += "Tempo: Mês de Setembro";
                  break;
              case 9:
                  filtro.innerHTML += "Tempo: Mês de Outubro";
                  break;
              case 10:
                  filtro.innerHTML += "Tempo: Mês de Novembro";
                  break;
              case 5:
                  filtro.innerHTML += "Tempo: Mês de Dezembro";
                  break;
              default:
                break;

            }
        }
        else if(getParameter()["tempo"]=="D"){
            document.getElementsByName("tempo")[2].checked = true;
            filtro.innerHTML += "Tempo: Hoje";
        }
    }
    else{
        document.getElementsByName("tempo")[0].checked = true;
        filtro.innerHTML += "Tempo: Ano de 2019";
    }
}

function progressBar(elapsed, tempo){
  var prg = document.getElementById('progress');
  var percent = 100*elapsed/tempo;
  var bartime = ((tempo)*1000)/396;
  prg.style.width = percent+"%";
  var id = setInterval(frame, bartime);
  function frame(){
    if(percent >= 100){
      clearInterval(id);
    }else{
      percent += 1/3.96;
      prg.style.width = percent+'%';
    }
  }
}

function validaForm(frm) {
    if(!frm.DAC.checked && !frm.DIC.checked && !frm.DCBV.checked){
        alert("Selecione um ou mais tipos de doenças para filtrar!");
        return false;
    }
    return true;
}

function mudaRegiao(regiao){
    var arrRegiao = Array();
    arrRegiao["todas"] = "Todas";
    arrRegiao["medio_paraiba"] = "Médio Paraíba";
    arrRegiao["baixada_litoranea"] = "Baixada Litorânea";
    arrRegiao["noroeste_fluminense"] = "Noroeste Fluminense";
    arrRegiao["norte_fluminense"] = "Norte Fluminense";
    arrRegiao["centro_sul"] = "Centro-Sul";
    arrRegiao["serrana"] = "Serrana";
    arrRegiao["metropolitana_ii"] = "Metropolitana II";
    arrRegiao["metropolitana_i"] = "Metropolitana I";
    arrRegiao["baia_ilha_grande"] = "Baía da Ilha Grande";
    document.getElementById(document.getElementById("regiao").value).style.fill="#4d4d4d";
    if(document.getElementById("regiao").value != regiao){
        document.getElementById(regiao).style.fill="#2f2f2f";
        document.getElementById("regiao").value = regiao;
        document.getElementById("regiao_txt").innerHTML = "Região Selecionada: "+arrRegiao[regiao];
        return;
    }
    document.getElementById(regiao).style.fill="#4d4d4d";
    document.getElementById("todas").style.fill="#2f2f2f";
    document.getElementById("regiao").value = "todas";
    document.getElementById("regiao_txt").innerHTML = "Região Selecionada: Todas";

}

var sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function displayMortes(atual, fator, segundos, elapsed){
    document.getElementById("nmortes").innerHTML=tratNumero(atual);
    progressBar(elapsed, segundos);
    sleep((segundos*1000)-(elapsed*1000)).then(() => {
        displayMortes(atual+fator, fator, segundos, 0)
    })
}

function calcmortes(mortes){
    if(mortes==0){
        return 0;
    }
    return (365*24*60*60)/mortes;
}

function callback(){
    var mortes = 0;

    var dac = new Array();

    dac["todas"] = 40930.34;
    dac["baia_ilha_grande"] = 464.2324;
    dac["baixada_litoranea"] = 1567.276;
    dac["centro_sul"] = 971.1788;
    dac["medio_paraiba"] = 2162.907;
    dac["metropolitana_i"] = 25798.74;
    dac["metropolitana_ii"] = 4726.924;
    dac["noroeste_fluminense"] = 847.0915;
    dac["norte_fluminense"] = 1685.388;
    dac["serrana"] = 2507.188;

    var dic = new Array();

    dic["todas"] = 13676.54;
    dic["baia_ilha_grande"] = 159.3463;
    dic["baixada_litoranea"] = 600.08;
    dic["centro_sul"] = 350.7056;
    dic["medio_paraiba"] = 716.816;
    dic["metropolitana_i"] = 8095.71;
    dic["metropolitana_ii"] = 2088.561;
    dic["noroeste_fluminense"] = 250.2873;
    dic["norte_fluminense"] = 536.48;
    dic["serrana"] = 804.5971;

    var dcbv = new Array();

    dcbv["todas"] = 8953.43;
    dcbv["baia_ilha_grande"] = 122.2903;
    dcbv["baixada_litoranea"] = 363.1451;
    dcbv["centro_sul"] = 221.5971;
    dcbv["medio_paraiba"] = 557.1634;
    dcbv["metropolitana_i"] = 5213.77;
    dcbv["metropolitana_ii"] = 1092.8575;
    dcbv["noroeste_fluminense"] = 232.7127;
    dcbv["norte_fluminense"] = 468.9056;
    dcbv["serrana"] = 670.7846;

    var regiao = document.getElementById("regiao").value;

    if(document.getElementById("DAC").checked){
        mortes+=dac[regiao];
    }
    if(document.getElementById("DIC").checked){
        mortes+=dic[regiao];
    }
    if(document.getElementById("DCBV").checked){
        mortes+=dcbv[regiao];
    }
    if(!document.getElementById("DIC").checked && !document.getElementById("DAC").checked && !document.getElementById("DCBV").checked){
        return;
    }

    var spm = calcmortes(mortes); //spm = segundos por morte
    var tempo = 0 //0=ano, 1=mes, 2=dia
    var temp = document.getElementsByName("tempo");
    if(temp[0].checked){
        tempo = 0;
    }else if(temp[1].checked){
        tempo = 1;
    }else if(temp[2].checked){
        tempo = 2;
    }
    var startDate = new Date();
    //calculando quantos segundos passaram desde 1 de janeiro
    if(tempo==0){
        startDate.setMonth(0);
        startDate.setDate(1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
    }//calculando quantos segundos passaram desde 1 do mes atual
    else if(tempo==1){
        startDate.setDate(1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
    }//calculando quantos segundos passaram desde 1meia noite de hoje
    else if(tempo==2){
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
    }
    var currentDate = new Date();
    var seconds = (currentDate.getTime() - startDate.getTime())/1000;
    //calculando quantas mortes aconteceram desde 1 de janeiro
    /**
        spm ---------- 1
        seconds ------ atual
        spm*atual = seconds
        atual = seconds/spm
    **/
    var atual = seconds/spm;
    //calculando o tempo passado desde a ultima morte (elapsed time)
    /**
        se temos que atual é um float, entao o tempo passado entre a ultima morte
        e o tempo atual é as casas decimais de atual * os segundos por morte
    **/
    var temp = parseInt(seconds/spm);
    temp = atual-temp;
    temp = temp*spm;
    atual = parseInt(atual);
    displayMortes(atual, 1, spm, temp);
}

function tratNumero(atual){
    var res="";
    var a = atual.toString();
    for(i=a.length-1; i>=0; i--){
        res=res+a[a.length-i-1];
        if(i%3==0 && a[a.length-i]!=undefined){
            res=res+".";
        }
    }
    return res;
}
