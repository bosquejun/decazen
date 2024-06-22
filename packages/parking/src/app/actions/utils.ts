import { auth } from '@/auth';
import { OnboardingStep, UserData } from '@/types';
import { ONBOARDING_STEPS } from '../../types';

export const getAccessToken = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('unauthorized');
  }

  return session?.access_token;
};

export const hasCompletedOnboardingStep = (
  user: UserData,
  lookupStep: OnboardingStep
) => {
  const current = user.metadata?.onBoardingStep;
  if (!current) return false;

  const currentIndex = ONBOARDING_STEPS.findIndex((o) => o === current);
  const lookupIndex = ONBOARDING_STEPS.findIndex((o) => o === lookupStep);

  return currentIndex >= lookupIndex;
};
