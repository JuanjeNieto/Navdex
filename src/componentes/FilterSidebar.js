// src/componentes/FilterSidebar.js

import React from 'react';

const FilterSidebar = ({ pokemonGames, selectedGenerations, selectAll, handleGenerationChange }) => {
    return (
        <aside className="filter-sidebar col-md-3 fixed-sidebar">
            <h2>Filtros</h2>
            <div className="filter-options">
                <div>
                    <input
                        type="checkbox"
                        id="todas"
                        name="generation"
                        value="Todas"
                        checked={selectAll}
                        onChange={handleGenerationChange}
                    />
                    <label htmlFor="todas">{selectAll ? 'Deseleccionar' : 'Seleccionar'}</label>
                </div>
                {Object.keys(pokemonGames).sort((a, b) => {
                    const aNum = parseInt(a.split('ª')[0], 10);
                    const bNum = parseInt(b.split('ª')[0], 10);
                    return aNum - bNum;
                }).map((generation, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={generation}
                            name="generation"
                            value={generation}
                            checked={selectedGenerations.includes(generation)}
                            onChange={handleGenerationChange}
                        />
                        <label htmlFor={generation}>{generation}</label>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FilterSidebar;
