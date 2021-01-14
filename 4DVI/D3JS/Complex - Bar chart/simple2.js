const margin = 50;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const sample = [{
    language: 'Rust',
    value: 78.9,
    color: '#000000'
  },
  {
    language: 'Kotlin',
    value: 75.1,
    color: '#00a2ee'
  },
  {
    language: 'Python',
    value: 68.0,
    color: '#fbcb39'
  },
  {
    language: 'TypeScript',
    value: 67.0,
    color: '#007bc8'
  },
  {
    language: 'Go',
    value: 65.6,
    color: '#65cedb'
  },
  {
    language: 'Swift',
    value: 65.1,
    color: '#ff6e52'
  },
  {
    language: 'JavaScript',
    value: 61.9,
    color: '#f9de3f'
  },
  {
    language: 'C#',
    value: 60.4,
    color: '#5d2f8e'
  },
  {
    language: 'F#',
    value: 59.6,
    color: '#008fc9'
  },
  {
    language: 'Clojure',
    value: 59.6,
    color: '#507dca'
  }
];

const svg = d3.select('svg');

const chart = svg.append('g')
  .attr('transform', `translate(${margin}, ${margin})`);

// Scaling Function and draw axis

const yScale = d3.scaleLinear()
  .range([height, 0])
  .domain([0, 100]);

chart.append('g')
  .call(d3.axisLeft(yScale));

const xScale = d3.scaleBand()
  .range([0, width])
  .domain(sample.map((s) => s.language))
  .padding(0.2)

chart.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Draw grid

// chart.append('g')
//   .attr('class', 'grid')
//   .call(d3.axisLeft()
//     .scale(yScale)
//     .tickSize(-width, 0, 0)
//     .tickFormat(''))

// LABELS

svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .attr('fill', '#F6F7F8')
  .text('Love meter (%)')

svg.append('text')
  .attr('class', 'label')
  .attr('x', width / 2 + margin)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'middle')
  .attr('fill', '#F6F7F8')
  .text('Languages')

svg.append('text')
  .attr('class', 'title')
  .attr('x', width / 2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .attr('fill', '#F6F7F8')
  .text('Most loved programming languages in 2018')

svg.append('text')
  .attr('class', 'source')
  .attr('x', width - margin / 2)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'start')
  .attr('fill', '#F6F7F8')
  .text('Source: Stack Overflow, 2018')

// Interractivity and chart construction

const barGroups = chart.selectAll()
  .data(sample)
  .enter()
  .append('g')

barGroups
  .append('rect')
  .attr('class', 'bar')
  .transition()
  .duration(200)
  .delay(function (d, i) {
    return i * 70;
  })
  .attr("fill", function (d, i) {
    return `rgb(${i * 20}, ${Math.round(i * 20 / 2)}, 200)`
  })
  .attr('x', (g) => xScale(g.language))
  .attr('y', (g) => yScale(g.value))
  .attr('height', (g) => height - yScale(g.value))
  .attr('width', xScale.bandwidth())

barGroups.on('mouseenter', function (actual, i) {
  const y = yScale(actual.value)
  const x = xScale(actual.language);

  d3.select(this)
    .transition()
    .duration(300)
    .attr('opacity', 0.6)
    .attr('x', (a) => xScale(a.language) - 5)
    .attr('width', xScale.bandwidth() + 10)

  chart.append('text')
    .attr('id', 'info')
    .attr('fill', 'white')
    .attr('opacity', 0.8)
    .attr('font-size', '14px')
    .attr('text-anchor', 'middle')
    .attr('x', x + xScale.bandwidth() / 2)
    .attr('y', y + 25)
    .text(`${actual.language} : ${actual.value}`);

  barGroups.append('text')
    .attr('class', 'divergence')
    .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 30)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .text((a, idx) => {
      const divergence = (a.value - actual.value).toFixed(1)

      let text = ''
      if (divergence > 0) text += '+'
      text += `${divergence}%`

      return idx !== i ? text : '';
    })

  const lineGroup = chart.append('g')
    .attr('id', 'limit');

  lineGroup.append('line')
    .attr('x1', 0)
    .attr('y1', y)
    .attr('x2', width)
    .attr('y2', y)
    .attr('stroke', actual.color)

  lineGroup.append('rect')
    .attr('x', -30)
    .attr('y', y - 15)
    .attr('height', 30)
    .attr('width', 50)
    .attr('fill', actual.color)


  lineGroup.append('text')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('x', -5)
    .attr('y', y + 5)
    .text(actual.value);


})
barGroups.on("mouseleave", function (actual, i) {
  d3.select(this).attr("opacity", 1)
  chart.selectAll('.divergence').remove()
  chart.selectAll('#limit').remove()
  chart.selectAll('#info').remove()

  d3.select(this)
    .transition()
    .duration(300)
    .attr('opacity', 1)
    .attr('x', (a) => xScale(a.language))
    .attr('width', xScale.bandwidth())
})