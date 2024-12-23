import useRefValue from "../libs/value";
import { IValue } from "../libs/interfaces";
import { IAccount } from "./types";

const useAccount = ():IAccount =>{
    const fiat: IValue<number> = useRefValue(0);
    const currency: IValue<number> = useRefValue(0);

    const depositFiat = (value: number)=> {
        fiat.set(fiat.get()+value);
    };
    const withdrawFiat = (value: number)=> {
        fiat.set(fiat.get()-value);
    };
    const depositCurrency = (value: number)=> {
        currency.set(currency.get()+value);
    };
    const withdrawCurrency = (value: number)=> {
        currency.set(currency.get()-value);
    };
    const getBalance = (currencyRate: number): number =>{
        console.log("get Balance", fiat.get(), currency.get(), currencyRate);
        return Math.round(fiat.get()+currency.get()*currencyRate);    
    };
    const getMoney = () =>{
        return {
            fiat: fiat.get(),
            currency: currency.get(),
        }
    };

    return { 
        depositFiat,
        withdrawFiat,
        depositCurrency,
        withdrawCurrency,
        getBalance,
        money: getMoney(),
    }
};

export default useAccount;