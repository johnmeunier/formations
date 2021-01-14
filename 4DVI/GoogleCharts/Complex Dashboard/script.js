import stadeAge from "./dataset/frequentation-du-stade-de-leuro-2016-selon-lage-des-visiteurs.js";
import stadeVie from "./dataset/frequentation-fanzone-lille-euro-2016-selon-situation-vie.js";
import elus from "./dataset/indemnites-des-elus-metropolitains.js";
import parkings from "./dataset/transpole-parkingrelais.js";

google.charts.load('current', {
  packages: ['corechart']
});

google.charts.setOnLoadCallback(drawChart);

const styleDark = {
  backgroundColor: {
    fill: "#033860"
  },
  legend: {
    textStyle: {
      color: "#fff"
    }
  },
  titleTextStyle: {
    color: "#fff"
  },
  vAxis: {
    textStyle: {
      color: "#fff"
    }
  },
  hAxis: {
    textStyle: {
      color: "#fff"
    }
  },
  colors: ["#05B2DC", "#004385", "#087CA7"]
}

function drawChart() {
  // Salaire HF

  var salairesHF = elus.map(({
    fields: {
      h_f,
      indemnite
    }
  }) => [h_f, indemnite]);
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'H/F');
  data.addColumn('number', 'Salaire');
  data.addRows([...salairesHF]);

  var groupedData = google.visualization.data.group(
    data,
    [0],
    [{
      column: 1,
      aggregation: google.visualization.data.avg,
      type: 'number'
    }]
  );

  var options = {
    title: 'Répartition des indemnités par genre',
    width: 700,
    height: 300,
    ...styleDark
  };



  var chart = new google.visualization.ColumnChart(
    document.getElementById('HFIndeminites'));

  chart.draw(groupedData, options);







  // Répartition HF

  const nombreHF = elus.reduce((acc, {
    fields: {
      h_f
    }
  }) => {
    if (h_f === "H") acc["H"] += 1;
    if (h_f === "F") acc["F"] += 1;
    return acc
  }, {
    "H": 0,
    "F": 0
  });
  var dataNombreHF = google.visualization.arrayToDataTable([
    ["H/F", "Nombre de pers"],
    ["H", nombreHF.H],
    ["F", nombreHF.F]
  ]);


  var options = {
    title: "Répartition d'homme et de femme",
    width: 300,
    height: 300,
    ...styleDark
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('HFCount'));

  chart.draw(dataNombreHF, options);




  // Par partie

  // Salaire HF

  var salairesGroupe = elus.map(({
    fields: {
      groupe,
      indemnite
    }
  }) => [groupe, indemnite]);
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Groupe');
  data.addColumn('number', 'Salaire');
  data.addRows([...salairesGroupe]);

  var groupedData = google.visualization.data.group(
    data,
    [0],
    [{
      column: 1,
      aggregation: google.visualization.data.avg,
      type: 'number'
    }]
  );

  var options = {
    title: 'Répartition des indemnités par groupe',
    width: 700,
    height: 300,
    ...styleDark
  };



  var chart = new google.visualization.ColumnChart(
    document.getElementById('groupeIndeminites'));

  chart.draw(groupedData, options);





  // Répartition HF

  const nombreGroupe = elus.reduce((acc, {
    fields: {
      groupe
    }
  }) => {
    if (acc[groupe]) acc[groupe] += 1;
    else acc[groupe] = 1;
    return acc
  }, {});

  var dataNombreHF = google.visualization.arrayToDataTable([
    ["H/F", "Nombre de pers"],
    ...Object.entries(nombreGroupe)
  ]);


  var options = {
    title: "Répartition par partie",
    width: 300,
    height: 300,
    ...styleDark
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('groupeCount'));

  chart.draw(dataNombreHF, options);


  // frequentationStade


  var frequentationAge = stadeAge.map(({
    fields
  }) => [new Date(fields.date), fields["18_24_ans"], fields["25_34_ans"], fields["35_44_ans"], fields["45_54_ans"], fields["55_64_ans"], fields["65_ans_et"]]);

  const groupedFrequentationAge = frequentationAge.reduce((acc, curr) => {
    let tmp = []
    tmp.push(curr[0]);
    const [, ...values] = curr;
    const sum = values.reduce((a = 0, b = 0) => a + b);
    tmp.push(sum);
    sum > 1000 && acc.push(tmp)
    return acc;
  }, []);

  console.log(groupedFrequentationAge);

  const sortedGroupedFrequentationAge = groupedFrequentationAge.sort(function ([a], [b]) {
    return a > b ? -1 : a < b ? 1 : 0;
  });

  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Nombre de personnes');
  data.addRows(sortedGroupedFrequentationAge);


  var options = {
    title: 'Company Performance',
    width: 1000,
    height: 500,
    legend: {
      position: 'bottom'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('frequentationStade'));

  chart.draw(data, options);


}