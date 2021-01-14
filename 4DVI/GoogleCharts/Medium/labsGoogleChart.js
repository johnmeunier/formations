google.charts.load('current', {
  packages: ['corechart']
});

google.charts.setOnLoadCallback(drawChart);




function drawChart() {
  fetch("https://data.opendatasoft.com/api/records/1.0/search/?dataset=nombre-de-ventes-de-titres-de-transports-entre-2014-et-2016-par-transpole%40metropole-europeenne-de-lille&facet=date&rows=30&sort=-date")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      const titres = myJson.records.map(({
        fields: {
          date,
          abonnements,
          titres_occasionnels
        }
      }) => [new Date(date), abonnements, titres_occasionnels]);
      let data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Abonnements');
      data.addColumn('number', 'Titres occasionnels');
      data.addRows([...titres]);

      var options = {
        title: 'Nombre de ventes de titres de transports entre 2014 et 2016 par Transpole',
        curveType: 'function',
        animation: {
          startup: true,
          duration: 300
        },
        hAxis: {
          format: 'd MMM YY'
        },
        vAxis: {
          logScale: true
        },
        legend: {
          position: 'bottom'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('titres'));

      chart.draw(data, options);
    })

  fetch("https://data.opendatasoft.com/api/records/1.0/search/?dataset=nombre-dabonnes-ileo-par-types-de-paiement-par-commune%40metropole-europeenne-de-lille&rows=395&facet=commune&facet=libelle_paiement").then(function (response) {
      return response.json();
    })
    .then(function ({
      records
    }) {
      const abo = records.map(({
        fields: {
          libelle_paiement,
          nombre_d_abonnes
        }
      }) => [libelle_paiement, nombre_d_abonnes]);
      let data = new google.visualization.DataTable();
      data.addColumn('string', "Type d'abo");
      data.addColumn('number', "Nombre d'abo");
      data.addRows([...abo]);

      const enhancedDate = google.visualization.data.group(
        data,
        [0],
        [{
          column: 1,
          aggregation: google.visualization.data.count,
          type: 'number'
        }]
      );

      var options = {
        title: 'My Daily Activities',
        pieHole: 0.4
      };

      var chart = new google.visualization.PieChart(document.getElementById('ileo'));
      chart.draw(enhancedDate, options);
    });

  setInterval(() => {
    fetch("https://data.opendatasoft.com/api/records/1.0/search/?dataset=transpole-parkingrelais%40metropole-europeenne-de-lille&rows=8&sort=capacite&facet=commune&facet=etat").then(function (response) {
        return response.json();
      })
      .then(function ({
        records
      }) {
        const parkings = records.map(({
          fields: {
            nom,
            capacite,
            nbplacesdispo
          }
        }) => [nom, capacite, nbplacesdispo]);
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Nom du parking relais');
        data.addColumn('number', 'Capacité');
        data.addColumn('number', 'Nombre de place dispo');
        data.addRows([...parkings]);

        var options = {
          title: 'Nombre de place disponibles dans les parkings relais de la métropole de Lille',
        };

        var chart = new google.visualization.ColumnChart(
          document.getElementById('parkingsRelais'));

        chart.draw(data, options);
      });
  }, 1000)



}