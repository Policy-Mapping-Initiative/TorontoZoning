create-data-folder:
	mkdir -p ./src/data

retrieve-zonning-area: create-data-folder
	cd ./src/data && wget https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/34927e44-fc11-4336-a8aa-a0dfb27658b7/resource/d75fa1ed-cd04-4a0b-bb6d-2b928ffffa6e/download/Zoning%20Area%20-%204326.geojson && mv "Zoning Area - 4326.geojson" ZoningArea.json

retrieve-readme: create-data-folder
	cd ./src/data && wget	https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/34927e44-fc11-4336-a8aa-a0dfb27658b7/resource/aa11a6f1-17fd-49b7-bbe4-f381bbc36f94/download/Zoning_readme.txt

retrieve-neighbourhoods: create-data-folder
	cp ./pre-comp/geojson/140NeighbourhoodsResidentialAreasByZone.geojson ./src/data/Neighbourhoods.json

retrieve-data: create-data-folder retrieve-zonning-area retrieve-neighbourhoods retrieve-readme
