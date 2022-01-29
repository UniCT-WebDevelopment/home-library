export interface ValidationError {
  /**
   * Specify is field is valid
   */
  isValid: boolean;
  /**
   * Message that has to apperead when field get error.
   */
  message: string;
  validate?: any;
}
