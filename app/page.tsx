"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import { GetProfile, UpdateProfile, GetPatterns } from "./aws/dataService"
import React, { useEffect, useState } from 'react';
import { startFrame } from "./models/consts";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import LoadingFrame from "./frames/frame.loading";
import useLocalizaion from "./libs/lib.localization";
import useProfile from "./models/profile";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [component, SetComponent] = useState<React.JSX.Element>();
  const [currentFrame, setCurrentFrame] = useState<number>(startFrame); 
  
  const profile = useProfile(UpdateProfile);
  const {words, getWord, setLanguage} = useLocalizaion(profile.data.lang);

  const fetchProfile = async () =>{
    try { 
        const tgProfile = await GetUserData(); 
        const dbProfile = await GetProfile(tgProfile.id);
        profile.setData({...tgProfile, ...dbProfile});
    } catch (error) { 
        setError((error as Error).message);
    } finally { 
        setLoading(false)
    };
  };
  
  const Frames = [
    {id: 0 , 
     element: <ProfileFrame 
                profile={profile}  
              />
    },
    {id: 1 , 
     element: <TradingFrame
                getWord={getWord}
                profile={profile}
              />
    },
    {id: 2 , 
     element: <StatisticFrame 
                profile={profile}
              />
    }   
  ];
  
  const ChangeFrame = (id: number) => {
    setCurrentFrame(id);
    SetComponent(Frames[id].element);
  };

  const ChangeLanguage = (lang_tag: string) => {
    profile.setData({lang: lang_tag });
    setLanguage(lang_tag);
  };

  
  useEffect(()=>{
    FullScreen();
  },[]);
  
  useEffect(()=>{
    ChangeFrame(currentFrame);
  },[words, profile.data]);
  
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading){
    return(
      <LoadingFrame/>
    )
  }else if (error){
    return (
      <h1>ERROR</h1>
    )  
  }else{
    return (
      <main 
        className="h-screen w-screen overflow-hidden bg-black"
      >
        <NavigationFrame
          onselected = {ChangeFrame} 
          lang = {profile.data.lang}
          getWord={getWord}
          setLanguage={ChangeLanguage}
        />
        <div 
          className="h-5/6"
        >
          {component}
        </div>
      </main>
    );
  }
}