"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

const ansiEscapeCode = '[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]',
      zeroWidthCharacterExceptNewline = '\u0000-\u0008\u000B-\u0019\u001b\u009b\u00ad\u200b\u2028\u2029\ufeff',
      zeroWidthCharacterDirectional = '\u202a\u202b\u202c\u202d\u202e\u202f',
      zeroWidthCharacter = '\n' + zeroWidthCharacterExceptNewline + zeroWidthCharacterDirectional,
      zeroWidthCharactersExceptNewline = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacterExceptNewline + ']', 'g'),
      zeroWidthCharacters = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacter + ']', 'g'),
      partition = new RegExp('((?:' + ansiEscapeCode + ')|[\t' + zeroWidthCharacter + '])?([^\t' + zeroWidthCharacter + ']*)', 'g');

module.exports = {

    zeroWidthCharacters,

    ansiEscapeCodes: new RegExp(ansiEscapeCode, 'g'),

    strlen: s => s.replace(zeroWidthCharacters, '').length,

    isBlank: s => s.replace(zeroWidthCharacters, '').replace(/\s/g, '').length === 0,

    blank: s => s.replace(zeroWidthCharactersExceptNewline, '').replace(/[^\t\n]/g, ' '),

    partition(s) {
        for (var m, spans = []; partition.lastIndex !== s.length && (m = partition.exec(s));) {
            spans.push([m[1] || '', m[2]]);
        }
        partition.lastIndex = 0; // reset
        return spans;
    },

    first(s, n) {

        let result = '',
            length = 0;

        for (const _ref of module.exports.partition(s)) {
            var _ref2 = _slicedToArray(_ref, 2);

            const nonPrintable = _ref2[0];
            const printable = _ref2[1];

            const text = printable.substr(0, n - length);
            result += nonPrintable + text;
            length += text.length;
        }

        return result;
    }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ByaW50YWJsZS1jaGFyYWN0ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsTUFBTSxpQkFBbUMsNEVBQXpDO0FBQUEsTUFDTSxrQ0FBbUMsc0VBRHpDO0FBQUEsTUFFTSxnQ0FBbUMsc0NBRnpDO0FBQUEsTUFHTSxxQkFBbUMsT0FBTywrQkFBUCxHQUF5Qyw2QkFIbEY7QUFBQSxNQUlNLG1DQUFtQyxJQUFJLE1BQUosQ0FBWSxRQUFRLGNBQVIsR0FBeUIsS0FBekIsR0FBaUMsK0JBQWpDLEdBQW1FLEdBQS9FLEVBQW9GLEdBQXBGLENBSnpDO0FBQUEsTUFLTSxzQkFBbUMsSUFBSSxNQUFKLENBQVksUUFBUSxjQUFSLEdBQXlCLEtBQXpCLEdBQWlDLGtCQUFqQyxHQUFzRCxHQUFsRSxFQUF1RSxHQUF2RSxDQUx6QztBQUFBLE1BTU0sWUFBbUMsSUFBSSxNQUFKLENBQVksU0FBUyxjQUFULEdBQTBCLE9BQTFCLEdBQW9DLGtCQUFwQyxHQUF5RCxVQUF6RCxHQUFzRSxrQkFBdEUsR0FBMkYsS0FBdkcsRUFBOEcsR0FBOUcsQ0FOekM7O0FBUUEsT0FBTyxPQUFQLEdBQWlCOztBQUViLHVCQUZhOztBQUliLHFCQUFpQixJQUFJLE1BQUosQ0FBWSxjQUFaLEVBQTRCLEdBQTVCLENBSko7O0FBTWIsWUFBUSxLQUFLLEVBQUUsT0FBRixDQUFXLG1CQUFYLEVBQWdDLEVBQWhDLEVBQ0UsTUFQRjs7QUFTYixhQUFTLEtBQUssRUFBRSxPQUFGLENBQVcsbUJBQVgsRUFBZ0MsRUFBaEMsRUFDRSxPQURGLENBQ1csS0FEWCxFQUNrQixFQURsQixFQUVFLE1BRkYsS0FFYSxDQVhkOztBQWFiLFdBQU8sS0FBSyxFQUFFLE9BQUYsQ0FBVyxnQ0FBWCxFQUE2QyxFQUE3QyxFQUNFLE9BREYsQ0FDVyxVQURYLEVBQ3VCLEdBRHZCLENBYkM7O0FBZ0JiLGNBQVcsQ0FBWCxFQUFjO0FBQ1YsYUFBSyxJQUFJLENBQUosRUFBTyxRQUFRLEVBQXBCLEVBQXlCLFVBQVUsU0FBVixLQUF3QixFQUFFLE1BQTNCLEtBQXVDLElBQUksVUFBVSxJQUFWLENBQWdCLENBQWhCLENBQTNDLENBQXhCLEdBQXlGO0FBQUUsa0JBQU0sSUFBTixDQUFZLENBQUMsRUFBRSxDQUFGLEtBQVEsRUFBVCxFQUFhLEVBQUUsQ0FBRixDQUFiLENBQVo7QUFBaUM7QUFDNUgsa0JBQVUsU0FBVixHQUFzQixDQUF0QixDQUZVLENBRWM7QUFDeEIsZUFBTyxLQUFQO0FBQ0gsS0FwQlk7O0FBc0JiLFVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYTs7QUFFVCxZQUFJLFNBQVMsRUFBYjtBQUFBLFlBQWlCLFNBQVMsQ0FBMUI7O0FBRUEsMkJBQXdDLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBMEIsQ0FBMUIsQ0FBeEMsRUFBc0U7QUFBQTs7QUFBQSxrQkFBMUQsWUFBMEQ7QUFBQSxrQkFBNUMsU0FBNEM7O0FBQ2xFLGtCQUFNLE9BQU8sVUFBVSxNQUFWLENBQWtCLENBQWxCLEVBQXFCLElBQUksTUFBekIsQ0FBYjtBQUNBLHNCQUFVLGVBQWUsSUFBekI7QUFDQSxzQkFBVSxLQUFLLE1BQWY7QUFDSDs7QUFFRCxlQUFPLE1BQVA7QUFDSDtBQWpDWSxDQUFqQiIsImZpbGUiOiJwcmludGFibGUtY2hhcmFjdGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBhbnNpRXNjYXBlQ29kZSAgICAgICAgICAgICAgICAgICA9ICdbXFx1MDAxYlxcdTAwOWJdW1soKSM7P10qKD86WzAtOV17MSw0fSg/OjtbMC05XXswLDR9KSopP1swLTlBLVBSWmNmLW5xcnk9PjxdJ1xuICAgICwgemVyb1dpZHRoQ2hhcmFjdGVyRXhjZXB0TmV3bGluZSAgPSAnXFx1MDAwMC1cXHUwMDA4XFx1MDAwQi1cXHUwMDE5XFx1MDAxYlxcdTAwOWJcXHUwMGFkXFx1MjAwYlxcdTIwMjhcXHUyMDI5XFx1ZmVmZidcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlckRpcmVjdGlvbmFsICAgID0gJ1xcdTIwMmFcXHUyMDJiXFx1MjAyY1xcdTIwMmRcXHUyMDJlXFx1MjAyZidcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlciAgICAgICAgICAgICAgID0gJ1xcbicgKyB6ZXJvV2lkdGhDaGFyYWN0ZXJFeGNlcHROZXdsaW5lICsgemVyb1dpZHRoQ2hhcmFjdGVyRGlyZWN0aW9uYWxcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlcnNFeGNlcHROZXdsaW5lID0gbmV3IFJlZ0V4cCAoJyg/OicgKyBhbnNpRXNjYXBlQ29kZSArICcpfFsnICsgemVyb1dpZHRoQ2hhcmFjdGVyRXhjZXB0TmV3bGluZSArICddJywgJ2cnKVxuICAgICwgemVyb1dpZHRoQ2hhcmFjdGVycyAgICAgICAgICAgICAgPSBuZXcgUmVnRXhwICgnKD86JyArIGFuc2lFc2NhcGVDb2RlICsgJyl8WycgKyB6ZXJvV2lkdGhDaGFyYWN0ZXIgKyAnXScsICdnJylcbiAgICAsIHBhcnRpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFJlZ0V4cCAoJygoPzonICsgYW5zaUVzY2FwZUNvZGUgKyAnKXxbXFx0JyArIHplcm9XaWR0aENoYXJhY3RlciArICddKT8oW15cXHQnICsgemVyb1dpZHRoQ2hhcmFjdGVyICsgJ10qKScsICdnJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICB6ZXJvV2lkdGhDaGFyYWN0ZXJzLFxuXG4gICAgYW5zaUVzY2FwZUNvZGVzOiBuZXcgUmVnRXhwIChhbnNpRXNjYXBlQ29kZSwgJ2cnKSxcblxuICAgIHN0cmxlbjogcyA9PiBzLnJlcGxhY2UgKHplcm9XaWR0aENoYXJhY3RlcnMsICcnKVxuICAgICAgICAgICAgICAgICAgLmxlbmd0aCxcblxuICAgIGlzQmxhbms6IHMgPT4gcy5yZXBsYWNlICh6ZXJvV2lkdGhDaGFyYWN0ZXJzLCAnJylcbiAgICAgICAgICAgICAgICAgICAucmVwbGFjZSAoL1xccy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09PSAwLFxuXG4gICAgYmxhbms6IHMgPT4gcy5yZXBsYWNlICh6ZXJvV2lkdGhDaGFyYWN0ZXJzRXhjZXB0TmV3bGluZSwgJycpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlICgvW15cXHRcXG5dL2csICcgJyksXG5cbiAgICBwYXJ0aXRpb24gKHMpIHtcbiAgICAgICAgZm9yICh2YXIgbSwgc3BhbnMgPSBbXTsgKHBhcnRpdGlvbi5sYXN0SW5kZXggIT09IHMubGVuZ3RoKSAmJiAobSA9IHBhcnRpdGlvbi5leGVjIChzKSk7KSB7IHNwYW5zLnB1c2ggKFttWzFdIHx8ICcnLCBtWzJdXSkgfVxuICAgICAgICBwYXJ0aXRpb24ubGFzdEluZGV4ID0gMCAvLyByZXNldFxuICAgICAgICByZXR1cm4gc3BhbnNcbiAgICB9LFxuXG4gICAgZmlyc3QgKHMsIG4pIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gJycsIGxlbmd0aCA9IDBcblxuICAgICAgICBmb3IgKGNvbnN0IFtub25QcmludGFibGUsIHByaW50YWJsZV0gb2YgbW9kdWxlLmV4cG9ydHMucGFydGl0aW9uIChzKSkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHByaW50YWJsZS5zdWJzdHIgKDAsIG4gLSBsZW5ndGgpXG4gICAgICAgICAgICByZXN1bHQgKz0gbm9uUHJpbnRhYmxlICsgdGV4dFxuICAgICAgICAgICAgbGVuZ3RoICs9IHRleHQubGVuZ3RoXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxufVxuIl19