import { ref } from 'vue';

export const usePasswordToggle = () => {
  const showCurrentPassword = ref(false);
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      showCurrentPassword.value = !showCurrentPassword.value;
    } else if (field === 'password') {
      showPassword.value = !showPassword.value;
    } else if (field === 'confirm') {
      showConfirmPassword.value = !showConfirmPassword.value;
    }
  };

  return {
    showCurrentPassword,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
  };
};

export const imagePreview = () => {
  const showPreview = ref('')
  const fileInput = ref(null)

  const removeImage = () => {
    showPreview.value = false
    fileInput.value.value = ''
  };

  return {
    showPreview,
    fileInput,
    removeImage,
  };
};
