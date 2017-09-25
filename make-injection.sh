#!/bin/bash

export INFILE="createMap.js"
export OUTFILE="header-code-injection.html"

cat > $OUTFILE <<EOF
<script src='https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.css' rel='stylesheet' />
<script>
EOF

minify $INFILE >> $OUTFILE

echo "</script>" >> $OUTFILE
