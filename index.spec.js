const { isValid } = require('./index');

describe('isValid', () => {
  test('validates a sequence of operations that produces the latest contents', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]';
    expect(isValid(stale, latest, otjson)).toBe(true);
  });

  test('returns false if delete operation goes past end of string', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });

  test('returns false if skip operation goes past end of string', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });

  test('validates a sequence of operations that produces the latest contents with insertions and deletions', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'We use operational transformations to keep everyone in a multiplayer repl in sync.';
    const otjson = '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]';
    expect(isValid(stale, latest, otjson)).toBe(true);
  });

  test('returns false if sequence of operations does not produce the latest contents', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'We can use operational transformations to keep everyone in a multiplayer repl in sync.';
    const otjson = '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });

  test('returns true if no operations are given', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const otjson = '[]';
    expect(isValid(stale, latest, otjson)).toBe(true);
  });

  test('returns false if invalid operation type is given', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "invalid", "count": 40}, {"op": "delete", "count": 47}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });

  test('returns false if delete operation count is negative', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "delete", "count": -1}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });

  test('returns false if skip operation count is negative', () => {
    const stale = 'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.';
    const latest = 'Repl.it uses operational transformations.';
    const otjson = '[{"op": "skip", "count": -1}]';
    expect(isValid(stale, latest, otjson)).toBe(false);
  });
});
