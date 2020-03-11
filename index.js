const fs = require('fs')

let style = JSON.parse(fs.readFileSync('src/style.json'))
style.sprite = 'https://maps.gsi.go.jp/vector/sprite/std'
style.sources.v = style.sources['gsibv-vectortile-source-1-4-17']
delete style.sources['gsibv-vectortile-source-1-4-17']
style.sources.v.tiles[0] = 
  'https://maps.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'

layers = []

for(layer of style.layers) {
  if (layer.type === 'background') {
  } else {
    layer.source = 'v'
    layer.id = layer.metadata.path + layer.minzoom
    delete layer.metadata
    layers.push(layer)
  }
}

style.layers = layers
console.log(JSON.stringify(style, null, 2))
