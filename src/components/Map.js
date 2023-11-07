import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { firebasedb } from '../firebase';
import { addDoc, collection, getDocs, query, } from "firebase/firestore";
import { async } from '@firebase/util';


mapboxgl.accessToken = 'pk.eyJ1IjoibmFtYXlwdXJpMjEiLCJhIjoiY2xvbndoYXVsMzEwdTJrcGxsemxmdG14aSJ9.oIOMdTcduAj4PKn-bvkeZQ';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(75.870495);
    const [lat, setLat] = useState(22.735779);
    const [zoom, setZoom] = useState(9);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('click', async (e) => {
            try {
                const coordinates = e.lngLat;
                console.log('You clicked the map at:', coordinates);

                await addDoc(collection(firebasedb, "Markers",), {
                    location: {
                        coordinates: Object.values(coordinates),
                        lable: "Lable"
                    },
                    timestamp: Date.now()
                });
                new mapboxgl.Marker({
                    color: "red",
                }).setLngLat(Object.values(coordinates)).addTo(map.current);

            } catch (error) {
                console.error(error);
            }

        });

        const getMarkers = async () => {
            const q = query(collection(firebasedb, "Markers"),);

            const querySnapshot = await getDocs(q);
            const markers = []
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                markers.push(doc.data())

            });
            setMarkers(markers)

        }
        getMarkers()


    });

    useEffect(() => {
        markers.forEach((marker) => {
            new mapboxgl.Marker().setLngLat(marker.location.coordinates).addTo(map.current);
        }
        )
    }, [markers])

    return (
        <div ref={mapContainer} className="map-container" />)
};

export default Map;