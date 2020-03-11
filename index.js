const fs = require('fs')

let style = JSON.parse(fs.readFileSync('src/style.json'))
style.sprite = 
  'https://un-vector-tile-toolkit.github.io/kawagoe/sprite/std'
style.sources.v = style.sources['gsibv-vectortile-source-1-4-17']
delete style.sources['gsibv-vectortile-source-1-4-17']
style.sources.v.tiles[0] = 
  'https://maps.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'

layers = [
{
  id: 'background',
  type: 'background',
  paint: {
    'background-color': [
      'rgb',
      255,
      255,
      255
    ]
  }
}
]

let count = 0
for(layer of style.layers) {
  if (layer.type === 'background') {
  } else {
    layer.source = 'v'
    layer.id = layer.metadata.path + ++count
    delete layer.metadata
    if (layer.layout && layer.layout['icon-image']) {
      layer.layout['icon-image'] =
        layer.layout['icon-image'].toString().replace(/std\/\/\//, '')
    }
    layers.push(layer)
  }
}

style.layers = layers
console.log(JSON.stringify(style, null, 2))
