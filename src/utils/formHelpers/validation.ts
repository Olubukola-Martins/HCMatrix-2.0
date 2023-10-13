import { Rule } from "antd/lib/form";
import moment, { Moment } from "moment";

// helpers
export const isDateGreaterThanCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isAfter(currentDate, "day"); // Check if selected date is greater than the current day
};
export const isDateGreaterThanOrEqualToCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isSameOrAfter(currentDate, "day"); // Check if selected date is greater than the current day
};
export const isDateLesserThanOrEqualToCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isSameOrBefore(currentDate, "day"); // Check if selected date is greater than the current day
};
// helpers -end

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];
export const generalValidationRulesOp: Rule[] = [
  { required: false, message: "Field is required!" },
];

export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { whitespace: true },
];
export const textInputValidationRulesOp: Rule[] = [
  {
    required: false,
    message: "Please input a non-empty value",
    whitespace: true,
  },
];
export const numberInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { type: "number" },
];
export const numberInputValidationRulesOp: Rule[] = [
  ...generalValidationRulesOp,
  { type: "number" },
];

export const textInputValidationRulesOpt: Rule[] = [
  { whitespace: true },
  { required: false },
];

export const emailValidationRules: Rule[] = [
  {
    required: true,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];
export const emailValidationRulesOp: Rule[] = [
  {
    required: false,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];

export const passwordValidationRules: Rule[] = [
  {
    required: true,
  },
  { message: "Field is required" },

  {
    validator: async (rule, value) => {
      let paswd =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

      if (!paswd.test(value))
        throw new Error(
          "Password should contain at least one digit and special character and a letter in uppercase, and least 8 characters"
        );
      // if (false) throw new Error("Something wrong!");
      return true;
    },
  },
];

export const dateHasToBeGreaterThanCurrentDayRule: Rule = {
  validator: async (rule, value) => {
    if (!isDateGreaterThanCurrentDay(value)) {
      throw new Error("Please select a date greater than the current day");
    }

    return true;
  },
};
export const dateHasToBeLesserThanOrEqualToCurrentDayRule: Rule = {
  validator: async (rule, value) => {
    if (!isDateLesserThanOrEqualToCurrentDay(value)) {
      throw new Error("Please select a day before today or today");
    }

    return true;
  },
};
export const dateHasToBeGreaterThanCurrentDayRuleForRange: Rule = {
  validator: async (rule, value) => {
    if (!isDateGreaterThanCurrentDay(value[0])) {
      throw new Error("Please select a date greater than the current day");
    }
    if (!isDateGreaterThanCurrentDay(value[1])) {
      throw new Error("Please select a date greater than the current day");
    }

    return true;
  },
};
export const dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange: Rule = {
  validator: async (_, value) => {
    if (!isDateLesserThanOrEqualToCurrentDay(value[0])) {
      throw new Error("Please select a date lesser than or equal to today!");
    }
    if (!isDateLesserThanOrEqualToCurrentDay(value[1])) {
      throw new Error("Please select a date lesser than or equal to today!");
    }

    return true;
  },
};

export const urlValidationRule: Rule = {
  validator: async (rule, value) => {
    let paswd = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!value.match(paswd)) throw new Error("Please enter a valid url");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};
export function isValidEvalExpression(
  expression: string,
  variables?: string[]
) {
  try {
    // Use eval to check if the expression is valid
    const parsedExpression = `${variables
      ?.filter((value, index, self) => self.indexOf(value) === index)
      ?.map((item) => `const ${item} = 0;`)
      .join("")} ${expression};`;
    console.log(parsedExpression, "parsed");
    // eslint-disable-next-line no-eval
    eval(parsedExpression);
    return true;
  } catch (error) {
    console.log(error, "ERR");
    // If eval throws an error, the expression is invalid
    return false;
  }
}

export const isFormulaValid = (input: string, acceptedVariables: string[]) => {
  //regex to match JavaScript arithmetic symbols and one or more whitespace characters, also digits
  // no equals, user should not be able to assign
  // const regex = /[\+\-\*\/\%\(\)\[\]\{\}\^\<\>\,\;\:\?\=\&\|\d]+|\s+/g;
  const regex = /[\+\-\*\/\%\(\)\[\]\{\}\^\<\>\,\;\:\?\=\&\|\d\.]+|\s+/g;

  const recognizedWords = [...acceptedVariables, "Infinity"];

  // Split the input string into an array of words using whitespace as the delimiter
  const inputWords = input.split(regex).filter((item) => item.trim() !== "");
  console.log(inputWords, "WHY");

  // Check if every word in the inputWords array is present in the wordArray
  return inputWords.every((word) => recognizedWords.includes(word));
};
const isValidVariableName = (name: string) => {
  const reservedKeywords = [
    // Add any additional reserved keywords here
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

  // Check if the name matches the basic constraints of a valid variable name
  const isValid = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);

  // Check if the name is a reserved keyword
  const isReserved = reservedKeywords.includes(name);

  // Return true if the name is valid and not a reserved keyword
  return isValid && !isReserved;
};
export const jsVariableNameValidationRule: Rule = {
  validator: async (rule, value = "") => {
    // Convert the value to its label equivalent
    const parsedValue = (value as string).trim().split(" ").join("_");
    if (!isValidVariableName(parsedValue))
      throw new Error("Please enter a valid variable name");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const phoneNumberValidationRule: Rule = {
  required: true,
  whitespace: true,
  validator: async (rule, value) => {
    let paswd = /^[0-9]*$/;

    if (!value.match(paswd)) throw new Error("Only digits are allowed");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};
export const phoneNumberValidationRuleOp: Rule = {
  required: false,
  whitespace: true,
  validator: async (rule, value) => {
    let paswd = /^[0-9]*$/;

    if (!value.match(paswd)) throw new Error("Only digits are allowed");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const validateTimeFrameForManualRepayment: Rule = {
  required: true,
  validator: async (_: any, value: number | string) => {
    if (typeof value === "undefined") {
      throw new Error("Please enter a value");
    }
    if (typeof value !== "number") {
      throw new Error("Only numbers are allowed");
    }
    if (+value < 1) {
      throw new Error(
        "Please enter a day that is either 1st, 25th, or between 1st and 25th"
      );
    }
    if (+value > 25) {
      throw new Error(
        "Please enter a day that is either 1st, 25th, or between 1st and 25th"
      );
    }

    return true;
  },
};
