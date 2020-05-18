import React from "react";
import { useParams } from 'react-router-dom';

import PlacesList from "../components/PlacesList"

const dummy_places= [
    {
        id:"p1",
        title:"Empire state building",
        description:"Best building in the world",
        image:"https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440",
        address:"bla bla new york USA",
        creatorId:"u1",
        location:{
            lat:"40.7484405",
            long:"-73.9878531"
        }
    },
    {
        id:"p2",
        title:"Taj Mahal",
        description:"Best building in the India",
        image:"https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
        address:"Agra Uttar Pradesh India",
        creatorId:"u2",
        location:{
            lat:"27.173891",
            long:"78.042068"
        }
    }
];

const Places = props =>{
    const userId = useParams().userId;
    const loadedPlaces = dummy_places.filter(place => place.creatorId === userId);
    return <PlacesList items={loadedPlaces}/>
}

export default Places;