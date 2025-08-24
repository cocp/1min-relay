/**
 * Model capabilities checking utilities
 * Centralized place for checking model capabilities
 */

import {
  VISION_SUPPORTED_MODELS,
  CODE_INTERPRETER_SUPPORTED_MODELS,
  RETRIEVAL_SUPPORTED_MODELS,
  FUNCTION_CALLING_SUPPORTED_MODELS,
  IMAGE_GENERATION_MODELS,
  TEXT_TO_SPEECH_MODELS,
  SPEECH_TO_TEXT_MODELS,
} from "../constants";

/**
 * Check if a model supports vision/image inputs
 */
export function supportsVision(model: string): boolean {
  return VISION_SUPPORTED_MODELS.includes(model);
}

/**
 * Check if a model supports code interpreter
 */
export function supportsCodeInterpreter(model: string): boolean {
  return CODE_INTERPRETER_SUPPORTED_MODELS.includes(model);
}

/**
 * Check if a model supports web search/retrieval
 */
export function supportsRetrieval(model: string): boolean {
  return RETRIEVAL_SUPPORTED_MODELS.includes(model);
}

/**
 * Check if a model supports function calling
 */
export function supportsFunctionCalling(model: string): boolean {
  return FUNCTION_CALLING_SUPPORTED_MODELS.includes(model);
}

/**
 * Check if a model supports image generation
 */
export function supportsImageGeneration(model: string): boolean {
  return IMAGE_GENERATION_MODELS.includes(model);
}

/**
 * Check if a model supports text-to-speech
 */
export function supportsTextToSpeech(model: string): boolean {
  return TEXT_TO_SPEECH_MODELS.includes(model);
}

/**
 * Check if a model supports speech-to-text
 */
export function supportsSpeechToText(model: string): boolean {
  return SPEECH_TO_TEXT_MODELS.includes(model);
}

/**
 * Get all capabilities for a model
 */
export function getModelCapabilities(model: string) {
  return {
    vision: supportsVision(model),
    codeInterpreter: supportsCodeInterpreter(model),
    retrieval: supportsRetrieval(model),
    functionCalling: supportsFunctionCalling(model),
    imageGeneration: supportsImageGeneration(model),
    textToSpeech: supportsTextToSpeech(model),
    speechToText: supportsSpeechToText(model),
  };
}

/**
 * Validate model requirements
 * Throws error if model doesn't support required capabilities
 */
export function validateModelCapabilities(
  model: string,
  requirements: {
    vision?: boolean;
    codeInterpreter?: boolean;
    retrieval?: boolean;
    functionCalling?: boolean;
  }
): void {
  const capabilities = getModelCapabilities(model);

  if (requirements.vision && !capabilities.vision) {
    throw new Error(`Model '${model}' does not support image inputs`);
  }

  if (requirements.codeInterpreter && !capabilities.codeInterpreter) {
    throw new Error(`Model '${model}' does not support code interpreter`);
  }

  if (requirements.retrieval && !capabilities.retrieval) {
    throw new Error(`Model '${model}' does not support web search/retrieval`);
  }

  if (requirements.functionCalling && !capabilities.functionCalling) {
    throw new Error(`Model '${model}' does not support function calling`);
  }
}
