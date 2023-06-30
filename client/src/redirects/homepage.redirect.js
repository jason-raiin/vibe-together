import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePageRedirect() {
  const navigate = useNavigate();
  useEffect(() => navigate('/'));
}
