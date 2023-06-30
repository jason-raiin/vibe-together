import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoPageRedirect() {
  const navigate = useNavigate();
  useEffect(() => navigate('/'));
}
