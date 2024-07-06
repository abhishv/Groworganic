export const isUserDetailsValid = () => {
    const userDetails = localStorage.getItem('userDetails');
    return !!userDetails;
  };
  