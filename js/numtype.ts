
export type integer = number;

export interface INumberType {
    isNull: boolean;
    addBy(o: INumberType): INumberType;
    subtractBy(o: INumberType): INumberType;
    multiplyBy(o: INumberType): INumberType;
    negate(): INumberType;
    toString(): string;
}

export interface INumberDivisibleType extends INumberType {
    dividedBy(O: INumberType): INumberType;
}



