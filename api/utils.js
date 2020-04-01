export default {
    getMarkersFromRoute: (route) => {
        let features = [];
        Object.keys(route.features).forEach(key => {
            features.push(route.features[key]);
        })
        features.pop();
        return features
    },

    getPolygonFromRoute: (route) => {
        let jsonCoords = route.features[Object.keys(route.features).length - 1].geometry.coordinates;
        return Object.keys(jsonCoords).map(key => {
            return {
                latitude: jsonCoords[key]["1"],
                longitude: jsonCoords[key]["0"],
            }
        })
    },

    getNameFromRoute: (route) => {
        return route.features[Object.keys(route.features).length - 1].properties.name;
    },


}