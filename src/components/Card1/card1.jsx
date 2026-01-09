import React,{useState} from "react";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import { useNavigate } from "react-router";
import { db} from "../../instantDB/instantdb";
import { create } from "zustand";
import { i } from "@instantdb/core";


const Card1 = ({ image }) => {
  const navigate = useNavigate();

  const [a,setA] = useState(crypto.randomUUID());
  const [isLiked, setIsLiked] = useState(false);
  const username = db.useUser();


  

  const { data, isLoading, error } = db.useQuery({
    interactions: {
      $: {
        where: {
          imageId: image.id,
        },
      },
    },
  });

  // Safe access with fallback
  const interactions = (data?.interactions || []);
  const likes = interactions.filter((i) => i.type === 'like').length;
  
 
  function handleLike() {
            
            
             db.transact(
            db.tx.interactions[a].update({
                type: 'like',
                imageId: image.id,
                username: username.email
            })
             );
              console.log(a);
             (isLiked ? db.transact(db.tx.interactions[a].delete()) : null);
             setIsLiked(!isLiked);
  }
  const a1 = a;
  return (
    <div
      className="border cursor-pointer"

      onClick={() => {navigate("/photo", { state: { image: image, a: a1 } })}}
    >

      <div className="h-[340px] w-full gap-5 mb-20 ">
        <div className="w-[232px] relative">
          <img
            src={image.urls.small}
            className="max-h-[350px]"
            alt={image.alt_description || "gallery image"}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            className="text-white absolute w-[12] rounded-full bg-opacity-[0.3] right-0 top-90 px-3 py-1 flex justify-between min-w-16  cursor-pointer"
          >
            <ThumbUpAltTwoToneIcon sx={{ color: isLiked ? "blue" : "white" }} />{" "}
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card1;
