import React, { useState, useEffect, useContext } from 'react';

import {
  twitterIcon,
  locationIcon,
  websiteIcon,
  companyIcon,
} from '../../constants/images';

import { ReactComponent as Twitter } from '../../assets/icon-twitter.svg';
import { Link } from 'react-router-dom';

const Card = ({ searchTerm, mode }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [joined, setJoined] = useState(null);
  const [bio, setBio] = useState(null);
  const [tag, setTag] = useState(null);

  // repos
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);

  // Links
  const [twitter, setTwitter] = useState(null);
  const [location, setLocation] = useState(null);
  const [website, setWebsite] = useState(null);
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.github.com/users/${searchTerm}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setImageUrl(data.avatar_url);
          createJoined(data.created_at);
          setBio(data.bio);
          setTag(data.login);

          // Repos
          setRepos(data.public_repos);
          setFollowers(data.followers);
          setFollowing(data.following);

          // Links
          setTwitter(data.twitter_username);
          setLocation(data.location);
          setWebsite(data.blog);
          setCompany(data.company);
        });
    };

    fetchData();
  }, [searchTerm]);

  const createJoined = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const finalMonth = switchMonth(month);
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newDate = `${day} ${finalMonth} ${year}`;
    setJoined(newDate);
  };

  const switchMonth = (month) => {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'Jan';
    }
  };

  return (
    <div className={`card bg-white shadow-1  ${mode === 1 && 'dark-card '}`}>
      <div className="card__top flex items-center">
        <div className="card__top-img">
          <img
            src={
              imageUrl != null ? imageUrl : 'https://www.fillmurray.com/640/360'
            }
            alt="profile"
          />
        </div>
        <div className="card__top__right ">
          <div className="card__top__right__info">
            <div className="card__top-name font-h1">{tag}</div>
            <div className="card__top-tag font-h3 text-blue">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://github.com/${tag}`}
              >
                @{tag ? tag.toLowerCase() : tag}
              </a>
            </div>
          </div>
          <div
            className={`card__top-joined font-joined text-grey ${
              mode === 1 && 'dark-card-joined'
            }`}
          >
            Joined {joined}
          </div>
        </div>
      </div>
      <div className="card__lower">
        <div
          className={`card__lower__bio font-body text-dblue my-1 mt-2 ${
            mode === 1 && 'dark-card-white '
          }`}
        >
          {bio ? bio : 'This profile has no bio'}
        </div>
        <div
          className={`card__lower__repos bg-offwhite py-1 px-2 ${
            mode === 1 && 'bg-black '
          }`}
        >
          <div
            className="card__lower__repos__amount flex column items-center "
            style={{ '--gap': '0rem' }}
          >
            <p
              className={`card__lower__repos__amount-repo text-dblue fw-regular font-h4 ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              Repos
            </p>
            <p
              className={`card__lower__repos__amount-num font-h2 text-black ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              {repos}
            </p>
          </div>
          <div
            className="card__lower__repos__followers flex column items-center"
            style={{ '--gap': '0rem' }}
          >
            <p
              className={`card__lower__repos__followers-followers text-dblue fw-regular font-h4 ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              Followers
            </p>
            <p
              className={`card__lower__repos__followers-num font-h2 text-black ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              {followers}
            </p>
          </div>
          <div
            className="card__lower__repos__following flex column items-center"
            style={{ '--gap': '0rem' }}
          >
            <p
              className={`card__lower__repos__following-following text-dblue fw-regular font-h4 ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              Following
            </p>
            <p
              className={`card__lower__repos__following-num font-h2 text-black ${
                mode === 1 && 'dark-card-repo-text'
              }`}
            >
              {following}
            </p>
          </div>
        </div>
        <div className="card__lower__links grid mt-2">
          <div className="card__lower__links__link flex  items-center">
            {location ? (
              <>
                <img src={locationIcon} alt="location" />
                <p
                  className={`font-body text-white ${
                    mode === 0 && 'text-grey'
                  }`}
                >
                  {location}
                </p>
              </>
            ) : (
              <>
                <img
                  src={locationIcon}
                  alt="location"
                  style={{ color: 'white' }}
                />
                <p
                  className={`font-body text-grey link-disabled ${
                    mode === 1 && 'dark-card-links-text'
                  }`}
                >
                  Not available
                </p>
              </>
            )}
          </div>
          <div className="card__lower__links__link flex  items-center">
            {twitter ? (
              <>
                <Twitter fill="red" />
                <p
                  className={`font-body text-white ${
                    mode === 0 && 'text-grey'
                  }`}
                >
                  {twitter}
                </p>
              </>
            ) : (
              <>
                <img
                  src={twitterIcon}
                  alt="location"
                  style={{ color: 'white' }}
                />
                <p
                  className={`font-body text-grey link-disabled ${
                    mode === 1 && 'dark-card-links-text'
                  }`}
                >
                  Not available
                </p>
              </>
            )}
          </div>
          <div className="card__lower__links__link flex  items-center">
            {website ? (
              <>
                <a className="flex text-white" href={`${website}`}>
                  <img src={websiteIcon} alt="website" />
                  <p
                    className={`font-body text-white ${
                      mode === 0 && 'text-grey'
                    }`}
                  >
                    {website}
                  </p>
                </a>
              </>
            ) : (
              <>
                <img
                  src={websiteIcon}
                  alt="location"
                  style={{ color: 'white' }}
                />
                <p
                  className={`font-body text-grey link-disabled ${
                    mode === 1 && 'dark-card-links-text'
                  }`}
                >
                  Not available
                </p>
              </>
            )}
          </div>
          <div className="card__lower__links__link flex items-center">
            {company ? (
              <>
                <img src={companyIcon} alt="company" />
                <p
                  className={`font-body text-white ${
                    mode === 0 && 'text-grey'
                  }`}
                >
                  {company}
                </p>
              </>
            ) : (
              <>
                <img
                  src={companyIcon}
                  alt="company"
                  style={{ color: 'white' }}
                />
                <p
                  className={`font-body text-grey link-disabled ${
                    mode === 1 && 'dark-card-links-text'
                  }`}
                >
                  Not available
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
