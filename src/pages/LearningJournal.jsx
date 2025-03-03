import React from 'react';
import LearningEntryForm from '../components/learning/LearningEntryForm';
import LearningEntryList from '../components/learning/LearningEntryList';
import LearningStats from '../components/learning/LearningStats';

const LearningJournal = () => {
  return (
    <div className="learning-journal-container">
      <h1>Diario de Aprendizaje</h1>
      
      <LearningStats />
      
      <LearningEntryForm />
      
      <LearningEntryList />
    </div>
  );
};

export default LearningJournal; 