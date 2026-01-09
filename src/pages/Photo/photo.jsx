import React, { useEffect,useCallback, useState, useRef } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import EmojiIcon from "../../components/EmojiIcon/emojiIcon.jsx";
import Navbar2 from "../../components/NavbarV2/navbar2.jsx";
import { useLocation } from "react-router-dom";
import { db } from "../../instantDB/instantdb.jsx";
import EmojiPicker from "emoji-picker-react";
import { useMemo } from "react";
const Photo = () => {
  const [b, setB] = React.useState(false);
  const [choosenEmoji, setChoosenEmoji] = useState("");
  const location = useLocation();
  const image = location.state.image;
  const scrollRef = useRef(null);

  const [a, setA] = useState(location.state.a);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const username = db.useUser().email;


  const { data } = db.useQuery({
    interactions: {
      $: {
        where: { imageId: image.id },
      },
    },
  });

  const interactions = data?.interactions || [];
  const likes = interactions.filter((i) => i.type === "like").length;
  const commentsLen = interactions.filter((i) => i.type === "comment").length;

  

  const reactions = interactions.filter((i) => i.type === "emoji"),

groupedReactions = useMemo(() => {
  return reactions.reduce((acc, curr) => {
    if (curr.payload) {
      if (!acc[curr.payload]) {
        acc[curr.payload] = { count: 0 };
      }

      acc[curr.payload].count += 1;

      if (curr.username === username.email) {
        acc[curr.payload].ownId = curr.id;
      }
    }
    return acc;
  }, {});
}, [reactions, username]);




    const handleDelete = useCallback((id) => {
        if (!db) return;
        db.transact(db.tx.interactions[id].delete());
    }, []);

   

    const comments = useMemo(() =>
        interactions
            .filter((i) => i.type === 'comment')
            .sort((a, b) => a.timestamp - b.timestamp),
        [interactions]
    );
      useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments]);

    const handleAddEmoji = useCallback((emoji) => {
        if ( !db) return;

        // If user already reacted with this emoji, delete it (toggle behavior)
        const existing = groupedReactions[emoji]?.ownId;
        if (existing) {
            handleDelete(existing);
            return;
        }

        db.transact(
            db.tx.interactions[crypto.randomUUID()].update({
                type: 'emoji',
                imageId: image.id,
                payload: emoji,
                username: username,
                timestamp: Date.now(),
            })
        );
    }, [ db, image.id, username, groupedReactions, handleDelete]);

     const handleSendComment = useCallback((e) => {
        e.preventDefault();
        if (!comment.trim() || !db) return;

        db.transact(
            db.tx.interactions[crypto.randomUUID()].update({
                type: 'comment',
                imageId: image.id,
                payload: comment.trim(),
                username: username,
                timestamp: Date.now(),
            })
        );
        setComment('');
    }, [comment, db, image.id, username]);



  const emojiPickerFunction = (emojiObject) => {
    const emoji = emojiObject.emoji;
     setChoosenEmoji(emoji);
    handleAddEmoji(choosenEmoji);
   
  };

  function handleLike() {
    db.transact(
      db.tx.interactions[a].update({
        type: "like",
        imageId: image.id,
        username: username,
      })
    );
    console.log(typeof location.state.a);
    isLiked ? db.transact(db.tx.interactions[a].delete()) : null;
    setIsLiked(!isLiked);
  }

  function handleEmoji() {
    setShowEmojiPicker((prev) => !prev);
  }

  function handleCommentIconClick() {
    const commentSection = document.getElementById("comment");
    commentSection.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center mt-15">
        <div className="flex flex-col h-full w-[400px] border rounded-t">
          <div className="sticky top-[52px] height-[64px] justify-start rounded-t-lg flex z-40 bg-white px-5">
            <div className="py-[8px] flex justify-start gap-5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className="flex gap-2 "
              >
                <ThumbUpAltOutlinedIcon
                  className="cursor-pointer "
                  sx={{ fill: isLiked ? "blue" : "null" }}
                />{" "}
                <span>{likes}</span>
              </button>
              <div className="commentIcon cursor-pointer" onClick={() => handleCommentIconClick()}>
                <CommentOutlinedIcon  />
              </div>
            </div>
          </div>
          <div className="max-h-[550px] w-full bg-white flex justify-self-center rounded-2xl">
            <div className="rounded-2xl flex justify-center items-center w-full h-full p-4 pt-0">
              <img
                className="rounded-2xl max-h-[500px]"
                src={image.urls.small}
                alt="image"
              />
            </div>
          </div>

          <div className="flex flex-col mx-[30px]">
            <div className="mx-[10px] flex flex-row ">
              <div className="w-[24px] rounded-full bg-white flex py-1 flex flex-row">
                <InsertEmoticonOutlinedIcon
                  onClick={() => handleEmoji()}
                  className=" cursor-pointer"
                />
              </div>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={emojiPickerFunction}
                  className="fixed w-full z-40"
                />
              )}
              <div className="flex ml-[10px] gap-2 items-center w-[300px] flex-wrap">
                 {Object.entries(groupedReactions).map(([emoji, data]) => (
                                    <button
                                        key={emoji}
       
                                        onClick={() => handleAddEmoji(emoji)}
                                        className="flex flex-wrap gap-1 bg-gray-500 rounded-full p-1"
                                    >
                                        <div>{emoji}</div>
                                        <div>{data.count}</div>
                                    </button>
                                ))}

               
              </div>
            </div>

            <div id="comment" className="mt-[10px] ">
              <div className="flex flex-col">
                <div className="max-h-[200px] overflow-auto relative ">
                  <div className="flex justify-between py-1 sticky top-0 z-40 bg-white">
                    <div>{commentsLen} Comments</div>
                  </div>

                {comments.map((c) => (
                  <div key={c.id} className="m-[10px] flex flex-row ">
                    <div className="rounded-full bg-white flex py-1 relative flex flex-row  ">
                      <div className="rounded-full  h-[30px] w-[30px]">
                        <img
                          className="rounded-full object-cover h-[30px] w-[30px] border object-cover"
                          src="https://instagram.fnag4-4.fna.fbcdn.net/v/t51.82787-15/608778638_18555385855001979_5293956955921219738_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=1&ig_cache_key=Mzc5OTA1MDQ1ODk0MjQ0NDU3MjE4NTU1Mzg1ODQ5MDAxOTc5.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIwMjh4MzYwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=mAZEfsAZjUUQ7kNvwFtj_s6&_nc_oc=AdmrPZ62VQuP6-MLqQfCmVdb27w4G0GJ1vfl9k7rJI06_qiBj2X98LHKRRt-Ch3eHpA&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fnag4-4.fna&_nc_gid=iXHvzapxOisjwVPIplkDOA&oh=00_Afph9fuREnykYjoWWH_HI96lquWxv7kEer8TT8yo5Mzs2w&oe=69602A3A"
                        />
                      </div>
                    </div>
                    <div className="flex ml-[10px] gap-2 items-center w-[300px] flex-wrap wrap-break-word">
                      <div className="flex flex-wrap w-[200px]  wrap-break-word break-all">
                        <span className="font-bold mr-[5px]">{c.username}</span>
                        <span className="">
                         {c.payload}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}


              </div>
                <form onSubmit={handleSendComment}>
                <div className="rounded-full border my-2 min-h-[40px] flex items-center px-1 break-all">
                  <input
                    className="w-[85%] outline-none"
                    type="text"
                    placeholder="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}

                  />
                  <button type="submit" onClick={handleSendComment} className="text-blue-600 font-bold">send</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
