
export type integer = number;

export interface INumberType<Self> {
    isNull: boolean;
    addBy(o: Self): Self;
    subtractBy(o: Self): Self;
    multiplyBy(o: Self): Self;
    negate(): Self;
    toString(): string;
}

export interface INumberDivisibleType<Self> extends INumberType<Self> {
    dividedBy(o: Self): Self;
}



