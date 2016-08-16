-- Trash bins
INSERT INTO Trash_Bins (description, filling_height, capacity, coordinates) VALUES (
    'GEO1',
    60,
    60,
    'POINT(7.595934 51.969148)'
), (
    'Bushaltestelle',
    60,
    60,
    'POINT(7.596760 51.969357)'
), (
    'Correnstraße',
    60,
    60,
    'POINT(7.596855 51.971076)'
);


-- Measurements
INSERT INTO Measurements(trash_bin_id, measured_distance, measured_filling_height) VALUES (
    1,
    20,
    40
), (
    2,
    40,
    20
), (
    3,
    60,
    0
);
