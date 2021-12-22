import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 5px;
  animation: animateThumb 0.8s;

  :hover {
    transform: scale(1.1);
  }

  /* Disable hover effect on very small screens */
  @media screen and (max-width: 486px) {
    :hover {
      transform: none !important;
    }
  }

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
