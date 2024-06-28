import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useModalClosure = (modalQueryParam: string) => {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(searchParams.has('modal'));
  const router = useRouter();

  const addModalParam = () => {
    const url = new URL(window.location.href);
    const existingModalValue = url.searchParams.get('modal');
    if (existingModalValue !== modalQueryParam) {
      url.searchParams.set('modal', modalQueryParam); // Use set to ensure uniqueness
      router.push(url.toString());
    }
  };

  const removeModalParam = () => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('modal')) {
      url.searchParams.delete('modal');
    }
    router.push(url.toString());
  };

  const openModal = () => {
    if (isOpen) return;
    addModalParam();
    setIsOpen(true);
  };

  const closeModal = () => {
    if (!isOpen) return;
    removeModalParam();
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};
