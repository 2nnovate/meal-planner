const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const testTarget = require('../test');

describe('testTarget', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('returnHello', () => {
    it('return string hello', () => {
      // Arrange
      const sut = testTarget;

      // Act
      const actual = sut.returnHello();

      // Assert
      expect(actual).to.eql('hello');
    });
  });

  describe('asyncHello', () => {
    it('return string hello', async () => {
      // Arrange
      const sut = testTarget;

      // Act
      const actual = await sut.asyncHello();

      // Assert
      expect(actual).to.eql('hello');
    });
  });

  describe('throwError', () => {
    context('if should throw error is false', () => {
      it('return string hello', () => {
        // Arrange
        const sut = testTarget;

        // Act
        const actual = sut.throwError(false);

        // Assert
        expect(actual).to.eql('hello');
      });
    });

    context('if should throw error is true', () => {
      it('throw Error', () => {
        // Arrange
        const sut = testTarget;

        // Act && Assert
        expect(() => sut.throwError(true)).to.throw('something wrong');
      });
    });
  });

  describe('asyncThrowError', () => {
    context('if should throw error is false', () => {
      it('return string hello', async () => {
        // Arrange
        const sut = testTarget;

        // Act
        const actual = await sut.asyncThrowError(false);

        // Assert
        expect(actual).to.eql('hello');
      });
    });

    context('if should throw error is true', () => {
      it('throw Error', async () => {
        // Arrange
        const sut = testTarget;

        // Act && Assert
        await expect(sut.asyncThrowError(true)).to.be.eventually
          .rejectedWith(Error).and
          .has.property('message').with.contain('something wrong');
      });
    });
  });

  describe('mocking', () => {
    it('return string hello', () => {
      // Arrange
      const sut = testTarget;
      const mock = sinon.mock(testTarget);
      mock.expects('returnHello').once().returns('hello');

      // Act
      const actual = sut.mocking();

      // Assert
      expect(actual).to.eql('hsello');
    });
  });
});
