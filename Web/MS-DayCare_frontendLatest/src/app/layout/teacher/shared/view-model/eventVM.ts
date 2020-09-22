export interface EventVM  {
    studentID?: string;
    start?: any;
    end?: any;
    title?: string;
    plannerRepeatTypeID?: number;
    description?: string;
    involvedEventClassesList?: any;
    endsOn?: any;
    startTime?: any;
    endTime?: any;
    agencyID?: number;
    id?: number;
    createdBy?: number;
    updatedBy?: number;
  }

  export interface MealVM  {
    studentID?: string;
    start?: any;
    end?: any;
    title?: string;
    plannerRepeatTypeID?: number;
    description?: string;
    involvedClass?: any;
    endsOn?: any;
    startTime?: any;
    endTime?: any;
    amount?: string;
    food?: number;
    quantity?: string;
    type?: string;
    repeat?: string;
    Endondate?: string;
    MealTypeID?: number;
    foodTypeID?: number;
    involvedMealFoodItems?: any;
    involvedMealFoodItemsSecond?: any;
    agencyID?: number;
    id?: number;
    involvedEventClassesList?: any;
    mon?: boolean;
    tue?: boolean;
    wed?: boolean;
    thu?: boolean;
    fri?: boolean;
    sat?: boolean;
    sun?: boolean;
    isBiweekly?: boolean;


  }
