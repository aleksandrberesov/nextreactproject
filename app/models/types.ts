import { TUpdateObjectProc } from '../libs/lib.types';

type TUser = {
    first_name: string;
    last_name?: string;    
};

type TStatisticItem = {
    title: string;
    isDone: boolean;    
};

type TCard = {
    title : string;
    description : string;
};

type TStar = {
    title : string;
};

type TMoney = {
    fiat: number;
    currency: number;
};

type TDeal = {
    openPrice: number;
    closePrice: number;
    openTime: number;
    closeTime: number;
    volume: number;
    amount: number;
    profitLoss: number;
};

interface IAccount {
    depositFiat: (value: number)=> void;
    withdrawFiat: (value: number)=> void;
    depositCurrency: (value: number)=> void;
    withdrawCurrency: (value: number)=> void;
    getBalance: (currencyRate: number) =>number;
    money: TMoney;
};

interface ITrade {
    init: (profile: IProfile, market: IMarket)=> void;
    buy: ()=> void;
    sell: ()=> void;
    close: ()=> void;
    
    balance: number,
    deal: TDeal,
    count: number,

    changed: boolean,
};

type TMarketPoint = {
    value: number;
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
};

type TPatternPoint = {
    expectation: number; 
    volatility: number;
    count: number;
};

type TMarket = {
    pattern: TPatternPoint[];
    points : TMarketPoint[];
};

interface IMarketDataManager {
    setPoints : (points: TMarketPoint[]) => void;
    appendPoint: (point: TMarketPoint) => void;
};

interface IMarket {
    init: (pattern: TPattern) => void;
    //points: TMarketPoint[];
    step: ()=> void;
    start: ()=> void;
    stop: ()=> void;
    pause: ()=> void;
    isActive: boolean;
    setDuration: (duration: number) => void;
    addManager: (manager: IMarketDataManager) => void;
    changed: boolean;
};

type TPattern = {
    pre_points : TPatternPoint[];
    points : TPatternPoint[];
};

interface IPattern {
    patterns : string[];
    pattern: TPattern;
    select : (name: string) => void;
    init : () => void;    
};

type TProfile = {
    id: number;
    lang?: string;
    user: TUser;
    balance: number;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
};

interface IProfile {
    data: TProfile;
    setData: TUpdateObjectProc;
};

export type { TUser, TStatisticItem, TCard, TStar };
export type { TMarketPoint, TPatternPoint };
export type { TProfile, TMarket, TPattern };
export type { IPattern, IProfile, IMarket, ITrade };
export type { IMarketDataManager };
export type { TMoney, IAccount,  };
export type { TDeal };