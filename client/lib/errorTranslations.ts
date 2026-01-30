/**
 * Error Translation Layer
 * Maps Roslyn C# compiler error codes to kid-friendly Swedish messages.
 * Designed for low cognitive load - one sentence max, calm tone.
 */

interface TranslatedError {
  friendly: string;
  technical: string;
  code?: string;
}

// Map of C# compiler error codes to Swedish explanations
const ERROR_MAP: Record<string, string> = {
  // Common syntax errors
  CS1002: "Du saknar ett semikolon ;",
  CS1513: "Du saknar en }",
  CS1514: "Du saknar en {",
  CS1525: "Något ser konstigt ut i koden här.",
  CS1026: "Du saknar en )",
  CS1003: "Du saknar en :",
  
  // Name/type errors
  CS0103: "Du använder ett namn som inte finns än. Har du glömt att skapa variabeln?",
  CS0246: "Det namnet känns inte igen. Kolla stavningen!",
  CS0029: "Du försöker använda fel typ av värde.",
  CS0019: "Du kan inte jämföra dessa värden på det sättet.",
  CS0165: "Variabeln har inget värde än. Ge den ett värde först!",
  
  // Method/function errors
  CS0161: "Metoden måste returnera ett värde.",
  CS0127: "Denna metod ska inte returnera något värde.",
  CS1501: "Fel antal värden skickades till funktionen.",
  CS0117: "Den funktionen finns inte.",
  
  // Assignment errors
  CS0131: "Du kan inte ändra det här värdet.",
  CS0266: "Du behöver säga vilken typ det är. Kanske saknar du (int) eller (string)?",
  
  // Loop/control errors
  CS0139: "Du kan inte använda 'break' här.",
  CS0140: "Du kan inte använda 'goto' här.",
  
  // General
  CS0116: "Den här koden måste vara inuti en metod.",
};

// Regex to extract error code from compiler output
const ERROR_CODE_REGEX = /\b(CS\d{4})\b/;

/**
 * Translates a compiler error to a friendly Swedish message.
 * @param error - Raw error string from compiler
 * @returns Object with friendly message and original technical error
 */
export function translateError(error: string): TranslatedError {
  if (!error || error.trim() === "") {
    return { friendly: "", technical: "" };
  }

  const match = error.match(ERROR_CODE_REGEX);
  const errorCode = match ? match[1] : undefined;
  
  let friendly: string;
  
  if (errorCode && ERROR_MAP[errorCode]) {
    friendly = ERROR_MAP[errorCode];
  } else {
    // Fallback for unknown errors - still try to be helpful
    friendly = getFallbackMessage(error);
  }

  return {
    friendly,
    technical: error,
    code: errorCode,
  };
}

/**
 * Provides a generic friendly message when we don't recognize the error code.
 */
function getFallbackMessage(error: string): string {
  const lowerError = error.toLowerCase();
  
  if (lowerError.includes("semicolon") || lowerError.includes(";")) {
    return "Du saknar troligen ett semikolon ;";
  }
  if (lowerError.includes("brace") || lowerError.includes("{") || lowerError.includes("}")) {
    return "Kolla att du har rätt antal { och }";
  }
  if (lowerError.includes("parenthesis") || lowerError.includes("(") || lowerError.includes(")")) {
    return "Kolla att du har rätt antal ( och )";
  }
  if (lowerError.includes("not exist") || lowerError.includes("does not exist")) {
    return "Något du försöker använda finns inte. Kolla stavningen!";
  }
  if (lowerError.includes("cannot convert") || lowerError.includes("type")) {
    return "Det verkar vara fel typ av värde.";
  }
  
  return "Något gick fel. Kolla din kod en gång till!";
}

/**
 * Checks if an error looks like a runtime error vs compilation error.
 */
export function isRuntimeError(error: string): boolean {
  const runtimeIndicators = [
    "Exception",
    "at line",
    "runtime",
    "NullReference",
    "IndexOutOfRange",
    "DivideByZero",
  ];
  
  return runtimeIndicators.some(indicator => 
    error.toLowerCase().includes(indicator.toLowerCase())
  );
}
