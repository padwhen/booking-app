import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import BookingWidget from "../../BookingWidget"
import PlaceGallery from "./PlaceGallery"
import AddressLink from "../../AddressLink"
import { PlaceRating } from "./PlaceRating"

export default function PlacePage() {
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    const [showFullInfo, setShowFullInfo] = useState(false)
    const toggleInfo = () => {
        setShowFullInfo(!showFullInfo)
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id])
    if (!place) return null;
    const checkAm = time => {
        if (time > 12) {
            return time + " PM"
        } else {
            return time + " AM"
        }
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink children={place.address} />
            <PlaceGallery place={place} />
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
                <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
                </div>
                    <b>Check-in: </b>{checkAm(place.checkIn)}<br />
                    <b>Check-out: </b>{checkAm(place.checkOut)}<br />
                    <b>Max number of guests: </b>{place.maxGuests}<br /> 
                    <div className="pt-5">
                        <span className="text-2xl font-semibold">Reviews by people who have stayed here</span>
                        <PlaceRating placeId={id} />                        
                    </div> 
            </div>
 
            <div>
                <BookingWidget place={place} />
            </div>
            </div>
            <div className="-mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">
                {showFullInfo ? place.extraInfo : place.extraInfo.slice(0, 200)}
                {place.extraInfo.length > 200 && (
                    <button onClick={toggleInfo} className="text-blue-500 hover:underline focus:outline-none bg-blue-100 rounded-md px-2 py-1 ml-1">
                        {showFullInfo ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>
            </div>
        </div>

    )
}