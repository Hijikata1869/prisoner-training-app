import React, {
  Fragment,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  Typography,
  Grid,
  Avatar,
  Button,
  ButtonBase,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Icons
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";

// apis
import { fetchUser, imageUpdate, fetchCurrentUser } from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { FailedAlert } from "../components/FailedAlert";
import { ReloadButton } from "../components/ReloadButton";
import { UserMenu } from "../components/UserMenu";

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: "1rem",
  },
  introduce: {
    fontSize: "20px",
    marginTop: "2rem",
  },
  updateButton: {
    marginTop: "2rem",
  },
  previedwImage: {
    width: "250px",
    height: "auto",
  },
  attachment: {
    "& label": {
      display: "inline-block",
      position: "relative",
      background: "#3f51b5",
      color: "#fff",
      fontSize: "16px",
      padding: "10px 18px",
      borderRadius: "4px",
      transition: "all 0.3s",
      marginRight: "1rem",
      marginTop: "1rem",
      "&:hover": {
        background: "#303f9f",
        transition: "all 0.4s",
      },
      "& input": {
        position: "absolute",
        left: "0",
        top: "0",
        opacity: "0",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        "&::-webkit-file-upload-button": {
          cursor: "pointer",
        },
      },
    },
    filename: {
      fontWeight: "16px",
      margin: "0 0 0 10px",
    },
  },
  previewTitle: {
    marginTop: "1rem",
  },
  imageUpdateButton: {},
  followButton: {
    marginTop: "1rem",
  },
  toFollowingButton: {
    marginRight: "0.5rem",
  },
  toFollowerButton: {
    marginLeft: "0.5rem",
  },
  userWrapper: {
    margin: "0 auto",
    padding: "0 2rem",
    marginBottom: "3rem",
  },
  bookmarkButtonWrapper: {
    marginRight: "auto",
  },
  menuIcon: {
    marginRight: "0.5rem",
  },
  menuContent: {
    marginBottom: "1rem",
  },
  userMenuWrapper: {
    marginTop: "2rem",
  },
}));

export const Users = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [upImg, setUpImage] = useState();
  const imgRef = useRef(null);
  const [userImage, setUserImage] = useState([]);
  const [crop, setCrop] = useState({
    width: 160,
    height: 160,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const previewCanvasRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentUserFollowingsArr, setCurrentUserFollowingsArr] = useState([]);
  const [userFollowingsArr, setUserFollowingsArr] = useState([]);
  const [userFollowersArr, setUserFollowersArr] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId, token, client, uid)
      .then((res) => {
        setUser(res.data.user);
        setUserImage(res.data.user.image.url);
        setUserFollowingsArr(res.data.userFollowings);
        setUserFollowersArr(res.data.userFollowers);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
        setCurrentUserFollowingsArr(res.data.currentUserFollowings);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFileName(e.target.files[0].name);

      document.getElementById(
        "uploadedFileName"
      ).textContent = `${e.target.files[0].name}`;
    }
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // canvas ??????JavaScript????????????????????????????????????????????????????????????????????????
    // getContext("2d") ??????????????????????????????????????????????????????????????????????????????????????????????????????
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const hundleImageUpdate = (canvas) => {
    if (!canvas) {
      return;
    }
    canvas.toBlob(
      (blob) => {
        const formData = new FormData();
        formData.append("image", blob, fileName);
        const currentUserId = currentUser.id;
        const currentUserToken = Cookies.get("access-token");
        const currentUserClient = Cookies.get("client");
        const currentUserUid = Cookies.get("uid");

        imageUpdate(
          currentUserId,
          currentUserToken,
          currentUserClient,
          currentUserUid,
          formData
        )
          .then(() => {
            setModalOpen(true);
          })
          .catch((e) => {
            console.error(e);
            setOpenAlert(true);
            window.scroll({ top: 0, behavior: "smooth" });
          });
      },
      "image/png",
      1
    );
  };

  const userFollowAction = (userId) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/relationships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserFollowingsArr(res.data.currentUserFollowings);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const userUnFollowAction = (userId) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/relationships`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserFollowingsArr(res.data.currentUserFollowings);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const userMenu = (
    <div className={classes.userMenuWrapper}>
      <Grid item>
        <ButtonBase
          className={classes.menuContent}
          onClick={() => history.push(`/users/${user.id}/training_logs`)}
        >
          <FitnessCenterOutlinedIcon className={classes.menuIcon} />
          <Typography>????????????????????????</Typography>
        </ButtonBase>
      </Grid>
      <Grid item className={classes.bookmarkButtonWrapper}>
        <ButtonBase
          className={classes.menuContent}
          onClick={() => history.push(`/users/${user.id}/bookmarks`)}
        >
          <BookmarkOutlinedIcon className={classes.menuIcon} />
          <Typography>??????????????????</Typography>
        </ButtonBase>
      </Grid>
      <Grid item xs={12}>
        <ButtonBase
          className={classes.menuContent}
          onClick={() => history.push(`/users/${user.id}/questions`)}
        >
          <HelpOutlineOutlinedIcon className={classes.menuIcon} />
          <Typography>???????????????</Typography>
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => history.push(`/users/${user.id}/advices`)}>
          <MessageOutlinedIcon className={classes.menuIcon} />
          <Typography>????????????????????????</Typography>
        </ButtonBase>
      </Grid>
    </div>
  );

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal
          message="?????????????????????????????????????????????"
          button={<ReloadButton />}
        />
      ) : null}
      {openAlert ? <FailedAlert message="???????????????????????????????????????" /> : null}
      <div className={classes.userWrapper}>
        <Grid container item direction="column" alignItems="center">
          <Hidden only="xs">
            <Grid item>
              <Typography
                variant="h3"
                gutterBottom
              >{`${user.nickname}???????????????????????????`}</Typography>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
              >{`${user.nickname}???????????????????????????`}</Typography>
            </Grid>
          </Hidden>
          <Grid item>
            <Avatar
              className={classes.largeAvatar}
              src={userImage ? userImage : ""}
            ></Avatar>
          </Grid>
          <Grid item>
            <ButtonBase
              className={classes.toFollowingButton}
              onClick={() => history.push(`/users/${user.id}/followings`)}
            >
              <Typography>{`${userFollowingsArr.length}????????????`}</Typography>
            </ButtonBase>
            <ButtonBase
              className={classes.toFollowerButton}
              onClick={() => history.push(`/users/${user.id}/followers`)}
            >
              <Typography>{`${userFollowersArr.length}???????????????`}</Typography>
            </ButtonBase>
          </Grid>
          <Grid item className={classes.followButton}>
            {currentUserFollowingsArr.find(
              (following) => following.id === user.id
            ) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => userUnFollowAction(match.params.userId)}
              >
                ???????????????
              </Button>
            ) : currentUser.length !== 0 ? (
              <Fragment>
                {user.id !== currentUser.id && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => userFollowAction(match.params.userId)}
                  >
                    ??????????????????
                  </Button>
                )}
              </Fragment>
            ) : null}
          </Grid>
          {user.id === currentUser.id ? (
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.attachment}>
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onSelectFile}
                      className={classes.profileChangeButton}
                    />
                    ????????????????????????????????????????????????
                  </label>
                  <span className={classes.filename} id="uploadedFileName">
                    ???????????????????????????
                  </span>
                </div>
              </Grid>
              <Grid item>
                <div>
                  {!completedCrop?.width || !completedCrop?.height ? null : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.previewTitle}
                    >
                      ?????????????????????
                    </Typography>
                  )}
                  <ReactCrop
                    className={classes.previedwImage}
                    locked
                    circularCrop
                    src={upImg}
                    crop={crop}
                    onImageLoaded={onLoad}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  />
                </div>
              </Grid>
              <Grid item>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.imageUpdateButton}
                  // "?." ????????????????????????????????????????????????
                  // ???????????????????????????????????????????????? . (?????????????????????MDN?????????????????????????????????????????????)??????????????????
                  //????????????????????? null ??? undefined ???????????? Uncaught TypeError: Cannot read property ?????????????????????
                  // ?. ???????????? undefined ????????????
                  // ?????????????????????????????????????????????????????????????????????????????????????????? undefined ??????????????????????????????????????????????????????????????????????????????
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={() => hundleImageUpdate(previewCanvasRef.current)}
                >
                  ???????????????????????????????????????
                </Button>
              </Grid>
            </Grid>
          ) : null}
          <Hidden smUp>{userMenu}</Hidden>
          <Grid item className={classes.introduce}>
            {user.introduction ? (
              <Fragment>
                <Typography variant="subtitle1" color="textSecondary">
                  ????????????
                </Typography>
                <Typography variant="h5" gutterBottom paragraph>
                  {user.introduction}
                </Typography>
              </Fragment>
            ) : (
              "????????????????????????????????????"
            )}
          </Grid>
          <Grid item>
            {user.id === currentUser.id ? (
              <Button
                className={classes.updateButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`${match.url}/auth/edit`);
                }}
              >
                ???????????????????????????
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};
